import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

const campaignInputSchema = z.object({
  brandName: z.string().min(1).max(100),
  industry: z.string().min(1).max(50),
  objective: z.string().min(1).max(50),
  lang: z.enum(["zh", "en"]).default("zh"),
});

const campaignSchema = {
  type: "object",
  properties: {
    theme: { type: "string", description: "行銷主題（一句吸引人的標語式主題）" },
    audience: { type: "string", description: "目標受眾分析（年齡、興趣、特徵）" },
    prAxis: { type: "string", description: "公關主軸（核心傳播策略敘事）" },
    phases: {
      type: "array",
      description: "三階段執行策略，每個階段一句話描述",
      items: { type: "string" },
    },
    expectedResults: { type: "string", description: "預期效益（具體量化的成效指標）" },
  },
  required: ["theme", "audience", "prAxis", "phases", "expectedResults"],
  additionalProperties: false,
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(100),
          company: z.string().max(100).optional().default(""),
          email: z.string().email().max(320),
          phone: z.string().max(50).optional().default(""),
          services: z.array(z.string()).default([]),
          description: z.string().max(2000).optional().default(""),
          budget: z.string().max(100).optional().default(""),
        })
      )
      .mutation(async ({ input }) => {
        const { name, company, email, phone, services, description, budget } = input;

        const content = [
          `姓名：${name}`,
          company ? `公司：${company}` : null,
          `電郵：${email}`,
          phone ? `電話：${phone}` : null,
          services.length ? `需求服務：${services.join("、")}` : null,
          budget ? `預算範圍：${budget}` : null,
          description ? `補充說明：${description}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        try {
          const delivered = await notifyOwner({
            title: `【Redin Creative】新諮詢：${name}${company ? ` (${company})` : ""}`,
            content,
          });
          return { success: true as const, notified: delivered };
        } catch (error) {
          console.error("[contact.submit] notify error:", error);
          // Still treat as success so the user sees confirmation; owner notification is best-effort
          return { success: true as const, notified: false };
        }
      }),
  }),

  campaign: router({
    generate: publicProcedure
      .input(campaignInputSchema)
      .mutation(async ({ input }) => {
        const { brandName, industry, objective, lang } = input;

        const systemPrompt =
          lang === "zh"
            ? `你是 Redin Creative 紅人創（香港頂級公關與行銷代理商）的資深策略總監，精通中港跨境營銷、KOL 網紅營銷、小紅書/抖音運營與品牌策略。請為客戶生成一份專業、創意且具備實戰價值的公關行銷企劃案。所有內容使用繁體中文，風格專業、具體、有數據支撐。`
            : `You are a Senior Strategy Director at Redin Creative, a top-tier Hong Kong PR and marketing agency specializing in cross-border marketing, KOL influencer marketing, Xiaohongshu/Douyin operations, and brand strategy. Generate a professional, creative, and actionable PR & marketing campaign plan. Respond entirely in English with a professional, specific, data-backed tone.`;

        const userPrompt =
          lang === "zh"
            ? `請為以下品牌生成專屬的公關行銷企劃案：\n品牌名稱：${brandName}\n產業別：${industry}\n核心行銷目標：${objective}\n\n請提供：行銷主題、目標受眾分析、公關主軸、三階段執行策略（每階段含時程與具體做法）、預期效益（含量化指標）。`
            : `Generate a tailored PR & marketing campaign plan for:\nBrand: ${brandName}\nIndustry: ${industry}\nObjective: ${objective}\n\nProvide: campaign theme, target audience analysis, PR core strategy, three-phase execution strategy (with timeline and specific actions per phase), and expected results (with quantified metrics).`;

        try {
          const response = await invokeLLM({
            model: "gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "campaign_plan",
                strict: true,
                schema: campaignSchema,
              },
            },
          });

          const content = response.choices?.[0]?.message?.content;
          if (!content) {
            return { success: false as const, plan: null };
          }

          const parsed = typeof content === "string" ? JSON.parse(content) : content;
          const phases = Array.isArray(parsed.phases) ? parsed.phases : [];

          return {
            success: true as const,
            plan: {
              theme: parsed.theme ?? "",
              audience: parsed.audience ?? "",
              prAxis: parsed.prAxis ?? "",
              phases,
              expectedResults: parsed.expectedResults ?? "",
            },
          };
        } catch (error) {
          console.error("[campaign.generate] LLM error:", error);
          return { success: false as const, plan: null };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
