import { SUPPORTED_TOKENS_DATA } from "./constants";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";


export type SupportedTokens = keyof typeof SUPPORTED_TOKENS_DATA;

export type TokenData = {
  address: string;
  chainId: string;
  decimals: number;
  name: string;
  symbol: string;
} | undefined;

export type TokenPriceData = GetAssetPriceInfoResponse | undefined;


