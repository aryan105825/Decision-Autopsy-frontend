export default function RunAnalysisButton({
  decisionId,
  onDone,
}: {
  decisionId: string;
  onDone: () => void;
}) {
  async function run() {
    await fetch(`https://decision-autopsy.onrender.com/analysis/${decisionId}`, {
      method: "POST",
    });
    onDone();
  }
  if (!decisionId) {
    alert("Please select a decision first");
    return;
  }



  return (
    <button
      type="button"
      onClick={run}
      disabled={!decisionId}

      className="inline-flex items-center justify-center rounded-sm border border-[#D4A72C] bg-[#141922] px-4 py-2 text-sm font-medium text-[#D4A72C] hover:bg-[#20273A] focus:outline-none focus:ring-2 focus:ring-[#D4A72C]"
    >
      Run Analysis
    </button>
  );
}
