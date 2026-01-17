import NewDecision from "./pages/NewDecision";
import PasteToParse from "./pages/PasteToParse";
import DecisionAnalysis from "./pages/DecisionAnalysis";
import "./index.css";

export default function App() {
  return (
    <div className="mx-auto  px-4 py-6  bg-[#0E1116] w-4/5 " id="rootx">
      <div className="flex align-middle ">

        <img src="/logo.svg" className="w-12 mx-0.5 mr-2" alt="" />
        <h1 className="text-xl place-content-center  font-medium text-[#E6EAF2]">
          Decision Autopsy
        </h1>
      </div>

      <div className="my-3 border-t border-[#2A3248]" />

      <NewDecision />

      <div className="my-4 border-t border-[#2A3248]" />

      <PasteToParse />

      <div className="my-4 border-t border-[#2A3248]" />

      <DecisionAnalysis />
    </div>
  );
}
