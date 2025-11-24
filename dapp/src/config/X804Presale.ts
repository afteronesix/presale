// src/config/X804Presale.ts

export const X804PresaleAddress =
  "0x76F201E7e27Da0dC2EB2c610Cd224380493bb029" as const;

export const X804PresaleABI = [
  // Read Functions
  {
    type: "function",
    name: "CAP",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_PURCHASE",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_PURCHASE",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "RATE",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "X804Token",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contributions",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "raisedAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  // Write Functions
  {
    type: "function",
    name: "buyTokens",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "withdrawETH",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawUnsoldTokens",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  // Events
  {
    type: "event",
    name: "TokensPurchased",
    inputs: [
      { name: "purchaser", type: "address", indexed: true },
      { name: "ethAmount", type: "uint256", indexed: false },
      { name: "tokenAmount", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const;
