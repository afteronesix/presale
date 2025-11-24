import { Gift, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AirdropModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-2xl p-8 w-[90%] max-w-md border border-neutral-700 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Gift className="text-yellow-400" /> Airdrop
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed">
          Airdrop page is not ready yet.
          <br />
          <span className="text-blue-400 font-semibold">Coming Soon 🚀</span>
        </p>
      </div>
    </div>
  );
};

export default AirdropModal;
