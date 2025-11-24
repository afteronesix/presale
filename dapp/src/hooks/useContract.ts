// src/hooks/useContract.ts

import {
  useReadContract,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { X804PresaleAddress, X804PresaleABI } from "../config/X804Presale";
import { X804_TOKEN_ADDRESS, X804_TOKEN_ABI } from "../config/X804Token";

export const usePresaleData = () => {
  const { address: userAddress } = useAccount();

  const { data: raisedAmountRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "raisedAmount",
  });

  const { data: capRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "CAP",
  });

  const { data: rateRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "RATE",
  });

  const { data: minPurchaseRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "MIN_PURCHASE",
  });

  const { data: maxPurchaseRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "MAX_PURCHASE",
  });

  const { data: userContributionRaw } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "contributions",
    args: [userAddress!],
    query: {
      enabled: !!userAddress,
    },
  });

  const { data: tokenAddress } = useReadContract({
    address: X804PresaleAddress,
    abi: X804PresaleABI,
    functionName: "X804Token",
  });

  const { data: contractTokenBalanceRaw } = useReadContract({
    address: X804_TOKEN_ADDRESS,
    abi: X804_TOKEN_ABI,
    functionName: "balanceOf",
    args: [X804PresaleAddress],
  });

  const raisedAmount = raisedAmountRaw
    ? formatEther(raisedAmountRaw as bigint)
    : "0";
  const cap = capRaw ? formatEther(capRaw as bigint) : "0";
  const rate = rateRaw ? Number(rateRaw) : 150000;
  const minPurchase = minPurchaseRaw
    ? formatEther(minPurchaseRaw as bigint)
    : "0.01";
  const maxPurchase = maxPurchaseRaw
    ? formatEther(maxPurchaseRaw as bigint)
    : "1.0";
  const userContribution = userContributionRaw
    ? formatEther(userContributionRaw as bigint)
    : "0";
  const contractTokenBalance = contractTokenBalanceRaw
    ? formatEther(contractTokenBalanceRaw as bigint)
    : "0";

  return {
    raisedAmount,
    cap,
    rate,
    minPurchase,
    maxPurchase,
    userContribution,
    tokenAddress,
    contractTokenBalance,
    isLoading: !raisedAmountRaw || !capRaw || !rateRaw,
  };
};

export const useBuyTokens = (ethAmountString: string) => {
  const {
    writeContract,
    data: hash,
    isPending: isBuyPending,
    error: buyError,
    isSuccess: isBuyInitiated,
  } = useWriteContract();

  let value: bigint | undefined;
  try {
    value = parseEther(ethAmountString);
  } catch (e) {
    value = undefined;
  }

  const buy = () => {
    if (value && value > 0) {
      writeContract({
        address: X804PresaleAddress,
        abi: X804PresaleABI,
        functionName: "buyTokens",
        value: value,
      });
    }
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash });

  return {
    buy,
    hash,
    isBuyPending,
    isBuyInitiated,
    isConfirming,
    isConfirmed,
    error: buyError || confirmError,
  };
};
