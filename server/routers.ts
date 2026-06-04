import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { insertInquiry } from "./db";

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

        const saved = await insertInquiry({
          name,
          company: company || null,
          email,
          phone: phone || null,
          services: services.length > 0 ? JSON.stringify(services) : null,
          description: description || null,
          budget: budget || null,
          status: "new",
        });

        try {
          const delivered = await notifyOwner({
            title: `【Redin Creative】新諮詢：${name}${company ? ` (${company})` : ""}`,
            content,
          });
          return { success: true as const, notified: delivered, inquiryId: saved?.id };
        } catch (error) {
          console.error("[contact.submit] notify error:", error);
          return { success: true as const, notified: false, inquiryId: saved?.id };
        }
      }),
  }),

  campaign: router({
    generate: publicProcedure
      .input(campaignInputSchema)
      .mutation(async ({ input }) => {
        const { brandName, industry, objective, lang } = input;

        const prompt =
          lang === "en"
            ? `You are a creative PR and marketing strategist. Generate a professional marketing campaign plan for "${brandName}" in the "${industry}" industry with the objective of "${objective}". Return ONLY valid JSON matching the schema provided.`
            : `你是一位創意公關與行銷策略家。為品牌「${brandName}」（${industry}行業）生成一份專業的行銷企劃案，核心目標為「${objective}」。僅返回符合指定 schema 的有效 JSON。`;

        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a creative PR and marketing strategist. Generate a professional marketing campaign plan. Return ONLY valid JSON matching this schema: ${JSON.stringify(campaignSchema)}`,
              },
              { role: "user", content: prompt },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "campaign_plan",
                strict: true,
                schema: campaignSchema as any,
              },
            },
          });

          const rawContent = response.choices?.[0]?.message?.content;
          const content = typeof rawContent === "string" ? rawContent : "";
          if (!content) {
            return { success: false as const, plan: null };
          }

          const plan = JSON.parse(content);
          return { success: true as const, plan };
        } catch (error) {
          console.error("[campaign.generate] LLM error:", error);
          return { success: false as const, plan: null };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
