import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { baseSepolia } from "@reown/appkit/networks";

const projectId = "b5177ed9c756b72ea8a9cb11f7aab606";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [baseSepolia],
  ssr: true,
  connectors: [],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseSepolia],
  projectId,
  metadata: {
    name: "X804 Presale",
    description: "X804 Presale Dapps",
    url: "https://x804.xyz",
    icons: ["https://x804.xyz/logo.png"],
  },
  features: {},
  themeMode: "dark",
});

export const config = wagmiAdapter.wagmiConfig;
