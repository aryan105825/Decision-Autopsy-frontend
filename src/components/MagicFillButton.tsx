export default function MagicFillButton({
  onFill,
}: {
  onFill: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onFill}
      className="inline-flex items-center justify-center rounded-sm border border-[#2A3248] bg-[#141922] px-4 py-2 text-sm font-medium text-[#E6EAF2] hover:bg-[#20273A] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF]"
    >
      Magic Fill (Demo)
    </button>
  );
}
