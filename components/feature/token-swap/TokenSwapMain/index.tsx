"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TokenSwapCard from "../TokenSwapCard";
import { useTokenData, useTokenPriceData } from "@/components/hooks/useTokenSwapAPI";


const TokenSwapMain = () => {

  const { tokenData, isTokenLoading, tokenError } = useTokenData({ chainId: "1", symbol: "ETH" });
  const { tokenPriceData, isTokenPriceLoading, tokenPriceError } = useTokenPriceData({ chainId: "1", assetTokenAddress: "0x0000000000000000000000000000000000000000" });

  console.log("tokenData", tokenData);
  console.log("tokenPriceData", tokenPriceData);
  console.log("isTokenLoading", isTokenLoading);
  console.log("isTokenPriceLoading", isTokenPriceLoading);
  console.log("tokenError", tokenError);
  console.log("tokenPriceError", tokenPriceError);

  return (
    <div className="token-swap-main-container">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Token Price Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="token-swap-content flex flex-col md:flex-row gap-4">
            <TokenSwapCard
              title="Buy"
              fieldTitle="Buy Token"
              type="buy"
              tokens={["Token 1", "Token 2"]}
            />
            <TokenSwapCard
              title="Sell"
              fieldTitle="Sell Token"
              type="sell"
              tokens={["Token 1", "Token 2"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenSwapMain;
