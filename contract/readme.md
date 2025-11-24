# 🚀 X804 Token & Presale Smart Contracts

<div align="center">

![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)
![Base Sepolia](https://img.shields.io/badge/Base-Sepolia-84532-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-Framework-yellow)
![Status](https://img.shields.io/badge/Project-Active-success)

</div>

---

## 🧩 Overview

This repository contains the smart contracts for:

- **X804Token.sol** — ERC‑20 token implementation
- **X804Presale.sol** — ICO / Presale mechanism

Both contracts are designed for deployment on the **Base Sepolia** test network.

---

## ⚙️ Project Specifications

| Feature                | Detail                         |
| ---------------------- | ------------------------------ |
| **Token Name**         | X804 Token                     |
| **Ticker**             | X804                           |
| **Standard**           | ERC‑20                         |
| **Decimals**           | 18                             |
| **Total Supply**       | 100,000,000 X804               |
| **Deployment Network** | Base Sepolia (Chain ID: 84532) |

---

## 💰 Presale Mechanics

X804Presale is configured with the following fixed settings:

| Parameter              | Value                 |
| ---------------------- | --------------------- |
| **Presale Allocation** | 30,000,000 X804 (30%) |
| **Hard Cap**           | 200 ETH               |
| **Exchange Rate**      | 1 ETH = 150,000 X804  |
| **Minimum Buy**        | 0.01 ETH              |
| **Maximum Buy**        | 1.0 ETH               |

---

## 📁 Project Structure

```
/X804-Presale-Contracts
├── contracts/
│   ├── X804Token.sol
│   └── X804Presale.sol
├── scripts/
│   └── deploy.js
├── arguments.js
├── hardhat.config.js
└── .env
```

---

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites

Ensure you have:

- **Node.js**
- **npm** or **yarn**

---

### 2️⃣ Install Dependencies

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox dotenv
```

---

### 3️⃣ Environment Variables

Create a `.env` file:

```
# Wallet Private Key
PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"

# Base Sepolia RPC URL
BASE_SEPOLIA_RPC_URL="https://sepolia.base.org"

# Basescan API Key
BASESCAN_API_KEY="YOUR_BASESCAN_API_KEY_HERE"
```

⚠️ **Never commit your `.env` file!**

---

## ⚙️ Hardhat Configuration

Add this content to **hardhat.config.js**:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASE_SEPOLIA_RPC_URL =
  process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
      chainId: 84532,
    },
  },

  etherscan: {
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api?chainid=84532",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};
```

---

## 🚀 Deployment Guide

### Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

---

## 🔍 Verification (Basescan)

### 1️⃣ Create constructor arguments file

**arguments.js**

```javascript
module.exports = ["0xc84932efcBeEdbcf5B25F41461DE3F2b7DB8f5Eb"];
```

### 2️⃣ Verify Token Contract

```bash
npx hardhat verify --network baseSepolia 0xc84932efcBeEdbcf5B25F41461DE3F2b7DB8f5Eb
```

### 3️⃣ Verify Presale Contract

```bash
npx hardhat verify --network baseSepolia   --constructor-args arguments.js   0x76F201E7e27Da0dC2EB2c610Cd224380493bb029
```

---

## 🎯 Final Notes

- Ensure your wallet has **Base Sepolia ETH** for gas.
- Always double-check constructor arguments before verification.

---

## © License

[MIT License](https://github.com/afteronesix/presale/blob/main/LICENSE) © 2025 X804 Project
