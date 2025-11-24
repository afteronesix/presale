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
  Users,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  UserMinus,
  Gift,
  X,
} from "lucide-react";

const PresaleUI = () => {
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  const [showAirdrop, setShowAirdrop] = useState(false);

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

  // Progress %
  const progress = useMemo(() => {
    const r = parseFloat(raisedAmount || "0");
    const c = parseFloat(cap || "1");
    return Math.min((r / c) * 100, 100);
  }, [raisedAmount, cap]);

  // Estimated Tokens
  const estimatedTokens = useMemo(() => {
    const eth = parseFloat(ethAmount || "0");
    return eth > 0 ? (eth * rate).toLocaleString() : "0";
  }, [ethAmount, rate]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#050507] to-[#0b0d10] text-white py-10 px-5 overflow-hidden">
      {/* FLOATING PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full blur-sm animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* FLOATING AIRDROP BUTTON */}
      <button
        onClick={() => setShowAirdrop(true)}
        className="fixed top-6 left-6 bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-full shadow-xl hover:scale-110 transition z-50"
      >
        <Gift size={26} />
      </button>

      {/* AIRDROP MODAL */}
      {showAirdrop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-8 w-[90%] max-w-md border border-neutral-700 relative">
            <button
              onClick={() => setShowAirdrop(false)}
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
              <span className="text-blue-400 font-semibold">
                Coming Soon 🚀
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
            X804 Token Presale
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Secure early access to the X804 ecosystem.
          </p>
        </div>

        {/* ABOUT */}
        <div className="relative p-6 mb-10 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
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
            . Its mission is to enable instant, automated crypto payments by
            reviving HTTP status code{" "}
            <span className="font-semibold">402 — “Payment Required”</span>.
            <br />
            <br />
            It enables{" "}
            <span className="text-blue-400 font-semibold">
              frictionless, account-free payments directly over HTTP
            </span>
            , powering APIs, digital content, and AI agents needing seamless
            autonomous payments.
            <br />
            <br />
            X804 continues this vision — building a fast, accessible,
            crypto-powered payment layer for the web.
          </p>
        </div>

        {/* TOKENOMICS */}
        <div className="relative p-6 mb-10 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
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

        {/* TEAM SECTION */}
        <div className="relative p-6 mb-10 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Core Team (Anonymous)</h2>
          </div>

          <div className="flex justify-between mt-4">
            {[
              { icon: <User size={26} />, label: "Anon A" },
              { icon: <UserCheck size={26} />, label: "Anon B" },
              { icon: <UserCog size={26} />, label: "Anon C" },
              { icon: <UserPlus size={26} />, label: "Anon D" },
              { icon: <UserMinus size={26} />, label: "Anon E" },
            ].map((m, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex flex-col items-center justify-center text-gray-300 shadow-md hover:border-cyan-400 transition"
              >
                {m.icon}
                <span className="text-[10px] mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRESALE PROGRESS */}
        <div className="relative p-6 mb-10 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
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

        {/* BUY BOX */}
        <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
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

      {/* ANIMATION CSS */}
      <style>{`
        .neon-border {
          position: relative;
        }
        .neon-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(90deg, #00d1ff55, #007bff55, #00d1ff55);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: glow 4s linear infinite;
        }

        @keyframes glow {
          0% { opacity: 0.25; }
          50% { opacity: 0.8; }
          100% { opacity: 0.25; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PresaleUI;
