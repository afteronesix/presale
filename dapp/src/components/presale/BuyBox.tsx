import { Coins, CheckCircle } from "lucide-react";

interface Props {
  ethAmount: string;
  setEthAmount: (v: string) => void;
  rate: number;
  isConnected: boolean;
  buy: () => void;
  isBuyPending: boolean;
  isConfirming: boolean;
  isBuyInitiated: boolean;
  isConfirmed: boolean;
  hash?: string;
  error?: any;
}

const BuyBox = ({
  ethAmount,
  setEthAmount,
  rate,
  isConnected,
  buy,
  isBuyPending,
  isConfirming,
  isBuyInitiated,
  isConfirmed,
  hash,
  error,
}: Props) => {
  const estimated = ethAmount ? (parseFloat(ethAmount) * rate).toLocaleString() : "0";

  return (
    <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Coins size={18} className="text-cyan-400" />
        Buy X804 Tokens
      </h2>

      {/* FAST INPUT */}
      <div className="flex gap-2 mb-3">
        {["0.1", "0.5", "1"].map((v) => (
          <button
            key={v}
            onClick={() => setEthAmount(v)}
            className="px-3 py-1 text-sm bg-neutral-800 border border-neutral-700 rounded-lg hover:border-blue-400 transition"
          >
            {v} ETH
          </button>
        ))}
      </div>

      <label className="text-sm text-gray-300">Enter ETH Amount</label>
      <input
        type="number"
        placeholder="0.1"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        className="w-full mt-2 p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-blue-500"
      />

      <p className="text-xs text-gray-400 mt-2">
        You will receive:{" "}
        <span className="text-blue-400 font-semibold">{estimated} X804</span>
      </p>

      <button
        onClick={() => {
          if (!isConnected) return alert("Connect wallet first.");
          buy();
        }}
        disabled={isBuyPending || isConfirming}
        className="w-full mt-5 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 font-semibold transition disabled:opacity-40"
      >
        {isBuyPending || isConfirming ? "Processing..." : "Buy Tokens"}
      </button>

      {isBuyInitiated && (
        <p className="text-yellow-400 text-sm mt-3">Transaction Sent...</p>
      )}

      {hash && (
        <p className="text-blue-400 text-xs mt-2 break-all">Tx: {hash}</p>
      )}

      {isConfirmed && (
        <p className="text-green-400 text-sm mt-3 flex items-center gap-1">
          <CheckCircle size={16} /> Purchase Confirmed!
        </p>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-3">
          Error: {error?.message || "Transaction failed"}
        </p>
      )}
    </div>
  );
};

export default BuyBox;
