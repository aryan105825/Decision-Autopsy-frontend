import { useState } from "react";
import { createDecision } from "../api";

export default function PasteToParse() {
    const [raw, setRaw] = useState("");
    const [result, setResult] = useState<any>(null);
    const [parsed, setParsed] = useState<any>(null);
    const [saved, setSaved] = useState(false);

    async function parse() {
        const res = await fetch("https://decision-autopsy.onrender.com/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rawContext: raw }),
        });

        const data = await res.json();
        setResult(data);
        setParsed(data.parsed || null);
        setSaved(false);
    }

    async function saveDecision() {
        if (!parsed) return;

        await createDecision({
            title: parsed.title || "Untitled Decision",
            rawContext: raw,
            structuredContext: {
                assumptions: parsed.assumptions || [],
                constraints: parsed.constraints || [],
                risks: parsed.risks || [],
                metrics: parsed.metrics || {},
            },
        });

        setSaved(true);
        window.dispatchEvent(new Event("decision-created"));
    }

    return (
        <div className="mt-4 rounded-sm border border-[#2A3248] bg-[#141922] p-10">
            <div className="space-y-4">
                <h2 className="text-base font-medium text-[#E6EAF2]">
                    Paste-to-Parse
                </h2>

                <div className="space-y-1">
                    <label className="block text-sm text-[#B4BCCF]">
                        Raw Context
                    </label>
                    <textarea
                        rows={6}
                        value={raw}
                        onChange={(e) => setRaw(e.target.value)}
                        className="w-full resize-none rounded-sm border border-[#2A3248] bg-[#1A2030] px-3 py-2 text-sm text-[#E6EAF2] placeholder-[#5A6275] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
                    />
                </div>

                <button
                    type="button"
                    onClick={parse}
                    className="inline-flex items-center justify-center rounded-sm border border-[#2A3248] bg-[#141922] px-4 py-2 text-sm font-medium text-[#4DA3FF] hover:bg-[#20273A] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
                >
                    Extract Structure
                </button>

                {result?.status === "LOW_CONFIDENCE" && (
                    <div className="rounded-sm border border-[#D4A72C] bg-[#141922] px-3 py-2 text-sm text-[#D4A72C]">
                        AI output could not be safely parsed. Raw output shown.
                    </div>
                )}

                {parsed && (
                    <>
                        <div className="rounded-sm border border-[#6C8EDC] bg-[#141922] px-3 py-2 text-sm text-[#6C8EDC]">
                            Structured context extracted. Review before saving.
                        </div>

                        <pre className="overflow-x-auto rounded-sm border border-[#1E2535] bg-[#0B0F14] p-3 text-sm text-[#E6EAF2]">
                            {JSON.stringify(parsed, null, 2)}
                        </pre>

                        {!saved && (
                            <button
                                type="button"
                                onClick={saveDecision}
                                className="inline-flex items-center justify-center rounded-sm border border-[#2A3248] bg-[#141922] px-4 py-2 text-sm font-medium text-[#E6EAF2] hover:bg-[#20273A] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
                            >
                                Save as Decision
                            </button>
                        )}
                    </>
                )}

                {saved && (
                    <div className="rounded-sm border border-[#3FA36C] bg-[#141922] px-3 py-2 text-sm text-[#3FA36C]">
                        Decision saved. Available for analysis.
                    </div>
                )}
            </div>
        </div>
    );
}
