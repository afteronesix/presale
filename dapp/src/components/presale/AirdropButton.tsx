import { Gift } from "lucide-react";

const AirdropButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-full shadow-xl hover:scale-110 transition z-50"
    >
      <Gift size={26} />
    </button>
  );
};

export default AirdropButton;
