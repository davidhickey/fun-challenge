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
import { useEffect, useMemo, useState } from "react";
import { SupportedTokens } from "@/lib/feature/token-swap/types";
import { SUPPORTED_TOKENS_DATA } from "@/lib/feature/token-swap/constants";
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
  sellUsdAmount,
}: {
  title: string;
  showInput: boolean;
  inputTitle?: string;
  type: string;
  sellUsdAmount: string;
  onSellUsdAmount?: (value: string) => void | (() => void) | undefined;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<SupportedTokens>("USDC");
  const [validationError, setValidationError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const { tokenData, tokenError, isTokenLoading } = useTokenData({
    chainId: SUPPORTED_TOKENS_DATA[selectedToken].chainId,
    symbol: selectedToken,
  });

  const { tokenPriceData, tokenPriceError, isTokenPriceLoading } =
    useTokenPriceData({
      chainId: SUPPORTED_TOKENS_DATA[selectedToken].chainId,
      assetTokenAddress: tokenData?.address || "",
    });


  const tokenAmount = useMemo(() => {
    if (sellUsdAmount && tokenPriceData?.unitPrice) {
      return Number(sellUsdAmount) / Number(tokenPriceData?.unitPrice);
    }
    return 0;
  }, [sellUsdAmount, tokenPriceData]);

  const handleTokenSelect = (token: SupportedTokens) => {
    setSelectedToken(token);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError("");
    //check if the input value is a number
    if (!/^\d*\.?\d*$/.test(e.target.value)) {
      setValidationError("Input must be number.");
      return;
    }
    setInputValue(e.target.value);
    if (onSellUsdAmount) {
      onSellUsdAmount(e.target.value);
    }
  };

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;
    if (tokenError || tokenPriceError) {
      setShowError(true);
      errorTimeout = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(errorTimeout);
  }, [tokenError, tokenPriceError]);

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
                  <div className="flex flex-row gap-2 items-center relative">
                    <span className="text-sm">$</span>
                    <Input
                      placeholder="0"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-[6rem]"
                    />
                    {validationError && <span className="text-xs font-normal text-red-500 h-0 absolute animate-pulse left-[1rem] bottom-[-.25rem] w-full">{validationError}</span>}
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
              <span className="text-sm">${sellUsdAmount || 0}</span>
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
              {showError && (
                <span className="text-xs text-red-500 animate-pulse">
                  Error occured. Please try again later.
                </span>
              )}
              {!showError && (isTokenLoading || isTokenPriceLoading) && (
                <span className="text-xs text-gray-500 animate-pulse fade-in">
                  Loading...
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
