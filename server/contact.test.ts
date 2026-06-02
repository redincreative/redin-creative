import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(),
}));

import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("notifies the owner and returns success on valid submission", async () => {
    vi.mocked(notifyOwner).mockResolvedValue(true);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.submit({
      name: "陳大文",
      company: "ABC 公司",
      email: "test@example.com",
      phone: "+852 12345678",
      services: ["品牌策略", "KOL/KOC 營銷"],
      description: "想了解中港跨境營銷服務",
      budget: "HK$50,000 - 200,000",
    });

    expect(result.success).toBe(true);
    expect(result.notified).toBe(true);
    expect(notifyOwner).toHaveBeenCalledOnce();
    const callArg = vi.mocked(notifyOwner).mock.calls[0][0];
    expect(callArg.title).toContain("陳大文");
    expect(callArg.content).toContain("test@example.com");
    expect(callArg.content).toContain("品牌策略");
  });

  it("still returns success when notification fails", async () => {
    vi.mocked(notifyOwner).mockRejectedValue(new Error("notify down"));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      services: ["SEO/SEM"],
    });

    expect(result.success).toBe(true);
    expect(result.notified).toBe(false);
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.submit({
        name: "Test",
        email: "not-an-email",
        services: [],
      })
    ).rejects.toThrow();
  });

  it("rejects empty name", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.submit({
        name: "",
        email: "test@example.com",
        services: [],
      })
    ).rejects.toThrow();
  });
});
