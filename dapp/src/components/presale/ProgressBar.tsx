import { Gauge } from "lucide-react";

interface Props {
  raisedAmount: string;
  cap: string;
  progress: number;
  isLoading: boolean;
}

const ProgressBar = ({ raisedAmount, cap, progress, isLoading }: Props) => {
  return (
    <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
      <div className="flex items-center gap-3 mb-4">
        <Gauge size={20} className="text-blue-400" />
        <h2 className="text-xl font-semibold">Presale Progress</h2>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading presale data...</p>
      ) : (
        <>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">{raisedAmount} ETH Raised</span>
            <span className="text-gray-300">{cap} ETH Cap</span>
          </div>

          <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-right text-xs text-gray-400 mt-1">
            {progress.toFixed(1)}%
          </p>
        </>
      )}
    </div>
  );
};

export default ProgressBar;
