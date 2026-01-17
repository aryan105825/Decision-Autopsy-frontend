import { useState } from "react";
import MagicFillButton from "../components/MagicFillButton";
import { createDecision } from "../api";

export default function NewDecision() {
  const [title, setTitle] = useState("");
  const [rawContext, setRawContext] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function submit(structuredContext: any) {
    try {
      await createDecision({
        title,
        rawContext,
        structuredContext,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function magicFill() {
    setTitle("Expand to EU Market");
    setRawContext(
      "Slack discussion about EU expansion, regulatory uncertainty, and budget constraints."
    );

    submit({
      assumptions: ["EU demand mirrors US demand"],
      constraints: ["Budget capped at $50k"],
      risks: ["Regulatory delays"],
      metrics: { CAC: 120 },
    });
  }

  return (
    <div className=" mx-auto rounded-sm p-10 bg-[#141922] border border-[#2A3248] ">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-medium text-[#E6EAF2]">
            New Decision
          </h1>
          <p className="text-sm text-[#7E879B]">
            Capture the context and reasoning behind an important decision.
          </p>
        </div>

        {/* Decision Title */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#B4BCCF]">
            Decision Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Expand to EU Market"
            className="w-full rounded-sm border border-[#2A3248] bg-[#1A2030] px-3 py-2 text-sm text-[#E6EAF2] placeholder-[#5A6275] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
          />
        </div>

        {/* Raw Context */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#B4BCCF]">
            Raw Context
          </label>
          <textarea
            value={rawContext}
            onChange={(e) => setRawContext(e.target.value)}
            rows={4}
            placeholder="Paste notes, Slack threads, or background context..."
            className="w-full resize-none rounded-sm border border-[#2A3248] bg-[#1A2030] px-3 py-2 text-sm text-[#E6EAF2] placeholder-[#5A6275] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              submit({
                assumptions: [],
                constraints: [],
                risks: [],
                metrics: {},
              })
            }
            className="inline-flex items-center justify-center rounded-sm border border-[#2A3248] bg-[#141922] px-4 py-2 text-sm font-medium text-[#E6EAF2] hover:bg-[#20273A] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
          >
            Save
          </button>

          <MagicFillButton onFill={magicFill} />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="rounded-sm border border-[#3FA36C] bg-[#141922] px-4 py-3 text-sm text-[#3FA36C]">
            Decision saved successfully
          </div>
        )}

        {status === "error" && (
          <div className="rounded-sm border border-[#E05858] bg-[#141922] px-4 py-3 text-sm text-[#E05858]">
            Failed to save decision
          </div>
        )}
      </div>
    </div>
  );
}
