import { useEffect, useState } from "react";
import RunAnalysisButton from "../components/RunAnalysisButton";
import AnalysisView from "../components/AnalysisView";

export default function DecisionAnalysis() {
    const [decisions, setDecisions] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);

    async function loadDecisions() {
        const res = await fetch("https://decision-autopsy.onrender.com/decisions");
        setDecisions(await res.json());
    }

    async function fetchLatestAnalysis(id: string) {
        const res = await fetch(`https://decision-autopsy.onrender.com/decisions/${id}`);
        const decision = await res.json();

        if (decision.analyses?.length) {
            setAnalysis(decision.analyses[decision.analyses.length - 1]);
        }
    }

    useEffect(() => {
        loadDecisions();

        function handleNewDecision() {
            loadDecisions();
        }

        window.addEventListener("decision-created", handleNewDecision);

        return () => {
            window.removeEventListener("decision-created", handleNewDecision);
        };
    }, []);

    return (
        <div className="bg-[#0E1116] min-h-screen">
            <div className="bg-[#141922] border border-[#2A3248] rounded-sm p-6 space-y-5">
                <h2 className="text-[#E6EAF2] text-base font-medium tracking-tight">
                    Decision Analysis
                </h2>

                <div className="space-y-1">
                    <label className="block text-sm text-[#B4BCCF]">
                        Decision
                    </label>
                    <select
                        value={selectedId}
                        onChange={(e) => {
                            setSelectedId(e.target.value);
                            setAnalysis(null);
                        }}
                        className="w-full border border-[#2A3248] rounded-sm px-3 py-2 text-sm text-[#E6EAF2] bg-[#1A2030] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
                    >
                        <option
                            value=""
                            disabled
                    
                        >
                            Select a decision
                        </option>
                        {decisions.map((d) => (
                            <option
                                key={d.id}
                                value={d.id}
                                
                            >
                                {d.title}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedId && (
                    <RunAnalysisButton
                        decisionId={selectedId}
                        onDone={() => fetchLatestAnalysis(selectedId)}
                    />
                )}

                {analysis && <AnalysisView analysis={analysis} />}
            </div>
        </div>
    );
}
