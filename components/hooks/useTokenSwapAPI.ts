import { useQuery } from "@tanstack/react-query";
import { TokenData, TokenPriceData } from "@/lib/feature/token-swap/types";

const fetchTokenData = async ({ chainId, symbol }: { chainId: string, symbol: string }): Promise<TokenData> => {
  const req = await fetch(`/api/token-swap?reqType=erc20&chainId=${chainId}&symbol=${symbol}`);
  if (!req.ok) {
    throw new Error(`Failed to fetch token data on request. Server response: ${req.status} ${req.statusText}`);
  }
  const { data, status, error } = await req.json();
  if (status !== 200) {
    throw new Error(`Failed to fetch token data on response. Server response: ${status} ${error}`);
  }
  return data;
};

const fetchTokenPriceData = async ({ chainId, assetTokenAddress }: { chainId: string, assetTokenAddress: string }): Promise<TokenPriceData> => {
  if (!assetTokenAddress) {
    throw new Error("Asset token address is required");
  }
  const req = await fetch(`/api/token-swap?reqType=price&chainId=${chainId}&assetTokenAddress=${assetTokenAddress}`);
  if (!req.ok) {
    throw new Error(`Failed to fetch token price data on request. Server response: ${req.status} ${req.statusText}`);
  }
  const { data, status, error } = await req.json();
  if (status !== 200) {
    throw new Error(`Failed to fetch token price data on response. Server response: ${status} ${error}`);
  }
  return data;
};

  const useTokenData = ({ chainId, symbol }: { chainId: string, symbol: string }): { tokenData: TokenData, isTokenLoading: boolean, tokenError: Error | null } => {
  const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useQuery({
    queryKey: ["token-swap", chainId, symbol],
    queryFn: () => fetchTokenData({ chainId, symbol }),
  });
  if (tokenError) {
    console.error("Token data error:", tokenError);
  }
  return { tokenData, isTokenLoading, tokenError };
};

const useTokenPriceData = ({ chainId, assetTokenAddress }: { chainId: string, assetTokenAddress: string }): { tokenPriceData: TokenPriceData, isTokenPriceLoading: boolean, tokenPriceError: Error | null } => {
  const { data: tokenPriceData, isLoading: isTokenPriceLoading, error: tokenPriceError } = useQuery({
    queryKey: ["token-price", chainId, assetTokenAddress],
    queryFn: () => fetchTokenPriceData({ chainId, assetTokenAddress }),
    staleTime: 0 //always fetch new data
  });
  if (tokenPriceError) {
    console.error("Token price error:", tokenPriceError);
  }
  return { tokenPriceData, isTokenPriceLoading, tokenPriceError };
};



export { useTokenData, useTokenPriceData };