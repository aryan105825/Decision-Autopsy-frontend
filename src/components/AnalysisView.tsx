export default function AnalysisView({ analysis }: { analysis: any }) {
  const isCompleted = analysis.status === "COMPLETED";
  const isLowConfidence = analysis.confidence === "LOW";

  return (
    <div className="mt-3 rounded-sm border border-[#2A3248] bg-[#141922] p-3 space-y-3">
      <h3 className="text-base font-medium text-[#E6EAF2]">
        Analysis Results
      </h3>

      <span
        className={`inline-flex items-center rounded-sm border px-2 py-1 text-xs font-medium ${
          isCompleted
            ? "border-[#6C8EDC] text-[#6C8EDC]"
            : "border-[#D4A72C] text-[#D4A72C]"
        }`}
      >
        Status: {analysis.status}
      </span>

      <div
        className={`text-sm ${
          isLowConfidence ? "text-[#D4A72C]" : "text-[#B4BCCF]"
        }`}
      >
        Confidence: {analysis.confidence}
      </div>

      {analysis.status !== "COMPLETED" && (
        <div className="rounded-sm border border-[#D4A72C] bg-[#141922] px-3 py-2 text-sm text-[#D4A72C]">
          Results may be incomplete or unreliable.
        </div>
      )}

      <pre className="rounded-sm border border-[#1E2535] bg-[#0B0F14] p-3 text-sm text-[#E6EAF2] overflow-x-auto">
        {JSON.stringify(analysis.results, null, 2)}
      </pre>
    </div>
  );
}
