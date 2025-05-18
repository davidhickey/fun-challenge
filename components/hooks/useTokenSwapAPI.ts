import { useQuery } from "@tanstack/react-query";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";

const fetchTokenData = async ({ chainId, symbol }: { chainId: string, symbol: string }) => {
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

const fetchTokenPriceData = async ({ chainId, assetTokenAddress }: { chainId: string, assetTokenAddress: string }): Promise<GetAssetPriceInfoResponse | null> => {
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

const useTokenData = ({ chainId, symbol }: { chainId: string, symbol: string }) => {
  const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useQuery({
    queryKey: ["token-swap"],
    queryFn: () => fetchTokenData({ chainId, symbol }),
  });
  return { tokenData, isTokenLoading, tokenError };
};

const useTokenPriceData = ({ chainId, assetTokenAddress }: { chainId: string, assetTokenAddress: string }) => {
  const { data: tokenPriceData, isLoading: isTokenPriceLoading, error: tokenPriceError } = useQuery({
    queryKey: ["token-price"],
    queryFn: () => fetchTokenPriceData({ chainId, assetTokenAddress }),
  });
  return { tokenPriceData, isTokenPriceLoading, tokenPriceError };
};



export { useTokenData, useTokenPriceData };