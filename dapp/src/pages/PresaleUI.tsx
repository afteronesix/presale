import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { usePresaleData, useBuyTokens } from "../hooks/useContract";
import {
  Rocket,
  Coins,
  Gauge,
  Wallet,
  Clock,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const PresaleUI = () => {
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState("");

  // READ DATA
  const {
    raisedAmount,
    cap,
    rate,
    minPurchase,
    maxPurchase,
    userContribution,
    contractTokenBalance,
    isLoading,
  } = usePresaleData();

  // WRITE TX
  const {
    buy,
    hash,
    isBuyPending,
    isBuyInitiated,
    isConfirming,
    isConfirmed,
    error,
  } = useBuyTokens(ethAmount);

  // Calculate progress %
  const progress = useMemo(() => {
    const r = parseFloat(raisedAmount || "0");
    const c = parseFloat(cap || "1");
    return Math.min((r / c) * 100, 100);
  }, [raisedAmount, cap]);

  // Estimated X804 tokens
  const estimatedTokens = useMemo(() => {
    const eth = parseFloat(ethAmount || "0");
    return eth > 0 ? (eth * rate).toLocaleString() : "0";
  }, [ethAmount, rate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] to-[#111] text-white py-10 px-5">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            X804 Token Presale
          </h1>
          <p className="text-gray-400 mt-2">
            Secure early access to the X804 ecosystem.
          </p>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-neutral-900/60 p-6 mb-8 rounded-2xl border border-neutral-700 backdrop-blur-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Rocket size={18} className="text-pink-400" />
            About X804
          </h2>

          <p className="text-gray-300 leading-relaxed text-sm">
            <span className="font-semibold text-white">What is X804?</span>
            <br />
            <br />
            X804 is a clone of X402, meaning it is{" "}
            <span className="font-semibold text-red-400">
              not an official Coinbase product
            </span>
            . Its purpose remains the same: powering an open payments protocol
            that revives the previously defunct HTTP status code{" "}
            <span className="font-semibold">402 - “Payment Required”</span> to
            enable instant, automated crypto payments for APIs, digital content,
            and web resources.
            <br />
            <br />
            Originally developed by Coinbase, the protocol enables{" "}
            <span className="text-blue-400 font-semibold">
              frictionless and account-free payments directly over HTTP
            </span>
            , making it especially useful for AI agents performing autonomous
            payments without intermediaries or complex authentication flows.
            <br />
            <br />
            X804 follows this same vision — delivering a fast and accessible
            payment layer powered by crypto.
          </p>
        </div>

        {/* TOKENOMICS */}
        <div className="bg-neutral-900/60 p-6 mb-8 rounded-2xl border border-neutral-700 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Coins size={20} className="text-yellow-400" />
            <h2 className="text-xl font-semibold">Tokenomics & Presale Info</h2>
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
              Your Contribution:{" "}
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

        {/* PRESALE PROGRESS */}
        <div className="bg-neutral-900/60 p-6 rounded-2xl mb-8 border border-neutral-700 backdrop-blur-xl shadow-xl">
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

              {/* Progress Bar */}
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

        {/* BUY SECTION */}
        <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-700 backdrop-blur-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Coins size={18} className="text-cyan-400" />
            Buy X804 Tokens
          </h2>

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
            <span className="text-blue-400 font-semibold">
              {estimatedTokens} X804
            </span>
          </p>

          <button
            onClick={() => {
              if (!isConnected)
                return alert("Please connect your wallet first.");
              buy();
            }}
            disabled={isBuyPending || isConfirming}
            className="w-full mt-5 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 font-semibold transition disabled:opacity-40"
          >
            {isBuyPending || isConfirming ? "Processing..." : "Buy Tokens"}
          </button>

          {/* TX STATUS */}
          {isBuyInitiated && (
            <p className="text-yellow-400 text-sm mt-3">Transaction Sent...</p>
          )}

          {hash && (
            <p className="text-blue-400 text-xs mt-2 break-all">
              Tx Hash: {hash}
            </p>
          )}

          {isConfirmed && (
            <p className="text-green-400 text-sm mt-3 flex items-center gap-1">
              <CheckCircle size={16} /> Purchase Confirmed!
            </p>
          )}

          {error && (
            <p className="text-red-400 text-sm mt-3">
              Error: {(error as any)?.message || "Transaction failed"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresaleUI;
