import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("campaign.generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a structured plan when the LLM responds with valid JSON", async () => {
    const mockPlan = {
      theme: "測試主題",
      audience: "測試受眾",
      prAxis: "測試主軸",
      phases: ["階段一", "階段二", "階段三"],
      expectedResults: "預期效益",
    };

    vi.mocked(invokeLLM).mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(mockPlan) } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.campaign.generate({
      brandName: "測試品牌",
      industry: "科技",
      objective: "品牌建立",
      lang: "zh",
    });

    expect(result.success).toBe(true);
    expect(result.plan).not.toBeNull();
    expect(result.plan?.theme).toBe("測試主題");
    expect(result.plan?.phases).toHaveLength(3);
  });

  it("returns success=false when the LLM throws an error", async () => {
    vi.mocked(invokeLLM).mockRejectedValue(new Error("LLM unavailable"));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.campaign.generate({
      brandName: "測試品牌",
      industry: "金融",
      objective: "產品曝光",
      lang: "zh",
    });

    expect(result.success).toBe(false);
    expect(result.plan).toBeNull();
  });

  it("returns success=false when the LLM returns empty content", async () => {
    vi.mocked(invokeLLM).mockResolvedValue({
      choices: [{ message: { content: "" } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.campaign.generate({
      brandName: "Test Brand",
      industry: "Technology",
      objective: "Brand Building",
      lang: "en",
    });

    expect(result.success).toBe(false);
    expect(result.plan).toBeNull();
  });

  it("rejects empty brand name input", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.campaign.generate({
        brandName: "",
        industry: "科技",
        objective: "品牌建立",
        lang: "zh",
      })
    ).rejects.toThrow();
  });
});
