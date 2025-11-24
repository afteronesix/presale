import { Coins, Rocket, TrendingUp, Wallet, Clock } from "lucide-react";

interface Props {
  rate: number;
  minPurchase: string;
  maxPurchase: string;
  userContribution: string;
  contractTokenBalance: string;
}

const Tokenomics = ({
  rate,
  minPurchase,
  maxPurchase,
  userContribution,
  contractTokenBalance,
}: Props) => {
  return (
    <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
      <div className="flex items-center gap-3 mb-4">
        <Coins size={20} className="text-yellow-400" />
        <h2 className="text-xl font-semibold">Tokenomics</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 text-gray-300 text-sm">
        <p className="flex items-center gap-2">
          <Rocket size={18} className="text-blue-400" />
          Rate: <span className="font-semibold">{rate} X804 / ETH</span>
        </p>

        <p className="flex items-center gap-2">
          <TrendingUp size={18} className="text-green-400" />
          Min Buy: <span className="font-semibold">{minPurchase} ETH</span>
        </p>

        <p className="flex items-center gap-2">
          <TrendingUp size={18} className="text-red-400" />
          Max Buy: <span className="font-semibold">{maxPurchase} ETH</span>
        </p>

        <p className="flex items-center gap-2">
          <Wallet size={18} className="text-purple-400" />
          You Contributed:{" "}
          <span className="font-semibold">{userContribution} ETH</span>
        </p>

        <p className="flex items-center gap-2">
          <Clock size={18} className="text-gray-400" />
          Token Reserve:{" "}
          <span className="font-semibold">
            {parseFloat(contractTokenBalance).toLocaleString()} X804
          </span>
        </p>
      </div>
    </div>
  );
};

export default Tokenomics;
