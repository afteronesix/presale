import { useState } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import { X804_PRESALE_ABI, X804_PRESALE_ADDRESS } from "../config/X804Presale";

export default function PresaleUI() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const [amount, setAmount] = useState<string>("");

  const { writeContract, isPending } = useWriteContract();

  const handleBuy = () => {
    if (!amount) return;
    writeContract({
      address: X804_PRESALE_ADDRESS,
      abi: X804_PRESALE_ABI,
      functionName: "buyTokens",
      value: parseEther(amount),
    });
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-10 text-white">
      {/* Container */}
      <div className="max-w-3xl w-full bg-[#0d0d0f] border border-white/10 rounded-2xl shadow-2xl p-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            X804 Token Presale
          </h1>
          <p className="text-white/60">
            Secure your allocation before public launch. Powered by Base Sepolia
            Testnet.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/50">Hard Cap</p>
            <p className="text-xl font-semibold">200 ETH</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/50">Rate</p>
            <p className="text-xl font-semibold">1 ETH = 150,000 X804</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/50">Presale Allocation</p>
            <p className="text-xl font-semibold">30,000,000 X804</p>
          </div>
        </div>

        {/* Buy Box */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">
            Participate in Presale
          </h2>

          <p className="text-sm text-white/50">
            Minimum Buy: <span className="text-white">0.01 ETH</span> — Maximum
            Buy: <span className="text-white">1.0 ETH</span>
          </p>

          <input
            type="number"
            placeholder="Enter ETH amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 focus:border-blue-500 outline-none text-white"
          />

          <button
            disabled={!isConnected || isPending}
            onClick={handleBuy}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all font-semibold disabled:opacity-40"
          >
            {isPending ? "Processing..." : "Buy X804 Tokens"}
          </button>

          {isConnected && (
            <p className="text-xs text-white/60 text-center pt-2">
              Balance: {balance ? formatEther(balance.value) : "0"} ETH
            </p>
          )}
        </div>

        {/* Project Details */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Project Specifications</h2>

          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <b>Token Name:</b> X804 Token
            </li>
            <li>
              <b>Ticker:</b> X804
            </li>
            <li>
              <b>Standard:</b> ERC-20
            </li>
            <li>
              <b>Decimals:</b> 18
            </li>
            <li>
              <b>Total Supply:</b> 100,000,000 X804
            </li>
            <li>
              <b>Network:</b> Base Sepolia (Chain ID: 84532)
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-white/40 text-sm">
          Powered by X804 Protocol • Base Sepolia Testnet
        </div>
      </div>
    </div>
  );
}
