"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TokenSwapCard from "../TokenSwapCard";
import { useCallback, useState } from "react";
import { debounce } from "@/lib/utils";
const TokenSwapMain = () => {
  const [sellUsdAmount, setSellUsdAmount] = useState<string>("");

  const debouncedSetSellUsdAmount = useCallback(
    debounce((...args: unknown[]) => {
      setSellUsdAmount(args[0] as string);
    }, 300),
    []
  );

  return (
    <div className="token-swap-main-container w-full lg:max-w-[60rem]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Token Price Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="token-swap-content flex flex-col lg:flex-row w-full gap-4">
            <TokenSwapCard
              title="Sell"
              showInput={true}
              type="sell"
              sellUsdAmount={sellUsdAmount}
              onSellUsdAmount={debouncedSetSellUsdAmount}
            />
            <TokenSwapCard
              title="Buy"
              showInput={false}
              type="buy"
              sellUsdAmount={sellUsdAmount}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenSwapMain;
