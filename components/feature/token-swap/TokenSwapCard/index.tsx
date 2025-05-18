"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { SupportedTokens, SUPPORTED_TOKENS_DATA } from "../TokenSwapMain";
import {
  useTokenData,
  useTokenPriceData,
} from "@/components/hooks/useTokenSwapAPI";

const TokenSwapCard = ({
  title,
  showInput,
  inputTitle,
  type,
  onSellUsdAmount,
  usdAmount,
}: {
  title: string;
  showInput: boolean;
  inputTitle?: string;
  type: string;
  usdAmount: string;
  onSellUsdAmount?: (value: string) => void | (() => void) | undefined;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<SupportedTokens>("USDC");

  const { tokenData, tokenError } = useTokenData({
    chainId: SUPPORTED_TOKENS_DATA[selectedToken].chainId,
    symbol: selectedToken,
  });
  const { tokenPriceData, tokenPriceError } =
    useTokenPriceData({
      chainId: SUPPORTED_TOKENS_DATA[selectedToken].chainId,
      assetTokenAddress: tokenData?.address,
    });


  const tokenAmount = useMemo(() => {
    if (usdAmount && tokenPriceData?.unitPrice) {
      return Number(usdAmount) / Number(tokenPriceData?.unitPrice);
    }
    return 0;
  }, [usdAmount, tokenPriceData]);

  const handleTokenSelect = (token: SupportedTokens) => {
    setSelectedToken(token);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onSellUsdAmount) {
      onSellUsdAmount(e.target.value);
    }
  };

  return (
    <Card className={`${type}-card-container w-full lg:w-1/2`}>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-2 w-full items-start md:flex-row md:items-center">
            {title}
            <div className="flex flex-row gap-2 align-start justify-start">
              {showInput && (
                <div className="flex flex-col gap-2">
                  {inputTitle && <span className="text-sm">{inputTitle}</span>}
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm">$</span>
                    <Input
                      placeholder="0"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-[6rem]"
                    />
                    <span>of</span>
                  </div>
                </div>
              )}
               <Select
              defaultValue={selectedToken}
              onValueChange={(value) =>
                handleTokenSelect(value as SupportedTokens)
              }
            >
              <SelectTrigger className="w-[6rem] p-l">
                <SelectValue placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_TOKENS_DATA &&
                  Object.keys(SUPPORTED_TOKENS_DATA).map((token: string) => (
                    <SelectItem key={token} value={token}>
                      {token}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="token-amount-container">
            <div className="flex flex-col gap-2">
              <span className="text-sm">${usdAmount || 0}</span>
            </div>
            <div className="flex flex-col gap-2 text-xl font-bold">
              <span className="h-2rem">
                {tokenAmount && tokenAmount > 0 && (
                  <span>
                    {tokenAmount.toFixed(4)} {selectedToken}
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col h-0">
              {tokenError && (
                <span className="text-sm text-red-500">
                  Error fetching token data.
                </span>
              )}
              {tokenPriceError && (
                <span className="text-sm text-red-500">
                  Error fetching token price data.
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSwapCard;
