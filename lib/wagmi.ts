import { http, createConfig } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { base } from "wagmi/chains";
import type { Hex } from "viem";

export const BASE_SPLIT_VAULT_APP_ID = "base-split-vault";
export const BASE_SPLIT_VAULT_APP_NAME = "base-split-vault";
export const CONTRACT_ADDRESS = "0xbc7c2b75957d3e4d63359c404ae5b2cef226a0af" as Hex;
export const BASE_APP_ID = "6a1fda064fbf682eb25dc0be";
export const TALENT_PROJECT_VERIFICATION = "REPLACE_WITH_TALENT_VERIFICATION_HASH";

export const builderCodeSuffixConfig = {
  builderCodeDataSuffix: "0x62635f77707a64336165780b0080218021802180218021802180218021" as Hex,
  encodedString: "bc_wpzd3aex",
};

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
      unstable_shimAsyncInject: 1500,
    }),
    coinbaseWallet({
      appName: BASE_SPLIT_VAULT_APP_NAME,
      preference: "all",
    }),
  ],
  dataSuffix: builderCodeSuffixConfig.builderCodeDataSuffix,
  multiInjectedProviderDiscovery: true,
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
