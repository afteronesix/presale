import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { usePresaleData, useBuyTokens } from "../../hooks/useContract";

import About from "./About";
import Tokenomics from "./Tokenomics";
import TeamSection from "./TeamSection";
import ProgressBar from "./ProgressBar";
import BuyBox from "./BuyBox";
import AirdropButton from "./AirdropButton";
import AirdropModal from "./AirdropModal";

const PresaleUI = () => {
  const { isConnected } = useAccount();

  const [ethAmount, setEthAmount] = useState("");
  const [showAirdrop, setShowAirdrop] = useState(false);

  // Read Data
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

  // Write Tx
  const {
    buy,
    hash,
    isBuyPending,
    isBuyInitiated,
    isConfirming,
    isConfirmed,
    error,
  } = useBuyTokens(ethAmount);

  // Progress
  const progress = useMemo(() => {
    const r = parseFloat(raisedAmount || "0");
    const c = parseFloat(cap || "1");
    return Math.min((r / c) * 100, 100);
  }, [raisedAmount, cap]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050507] to-[#0b0d10] text-white py-10 px-5 overflow-hidden">
      
      {/* Floating Airdrop Button */}
      <AirdropButton onClick={() => setShowAirdrop(true)} />

      {/* Airdrop Modal */}
      <AirdropModal open={showAirdrop} onClose={() => setShowAirdrop(false)} />

      <div className="max-w-2xl mx-auto space-y-8">
        <About />

        <Tokenomics
          rate={rate}
          minPurchase={minPurchase}
          maxPurchase={maxPurchase}
          userContribution={userContribution}
          contractTokenBalance={contractTokenBalance}
        />

        <TeamSection />

        <ProgressBar
          raisedAmount={raisedAmount}
          cap={cap}
          progress={progress}
          isLoading={isLoading}
        />

        <BuyBox
          ethAmount={ethAmount}
          setEthAmount={setEthAmount}
          rate={rate}
          isConnected={isConnected}
          buy={buy}
          isBuyPending={isBuyPending}
          isConfirming={isConfirming}
          isBuyInitiated={isBuyInitiated}
          isConfirmed={isConfirmed}
          hash={hash}
          error={error}
        />
      </div>
    </div>
  );
};

export default PresaleUI;
