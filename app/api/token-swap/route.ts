import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.FUNKIT_API_KEY) {
      return NextResponse.json({
        data: null,
        status: 500,
        error: "FUNKIT_API_KEY is not set",
      });
    }
    const { searchParams } = new URL(request.url);
    const reqType = searchParams.get("reqType");
    const chainId = searchParams.get("chainId");
    const symbol = searchParams.get("symbol");
    const assetTokenAddress = searchParams.get("assetTokenAddress");
    let data = null;
    if (reqType === "price") {
      if (!chainId || !assetTokenAddress) {
        return NextResponse.json({
          data: null,
          status: 400,
          error: `Missing required parameters: chainId: ${chainId}, assetTokenAddress: ${assetTokenAddress}`,
        });
      }
      data = await getAssetPriceInfo({
        chainId,
        assetTokenAddress,
        apiKey: process.env.FUNKIT_API_KEY,
      });
    } else {
      if (!chainId || !symbol) {
        return NextResponse.json({
          data: null,
          status: 400,
          error: `Missing required parameters: chainId: ${chainId}, symbol: ${symbol}`,
        });
      }
      data = await getAssetErc20ByChainAndSymbol({
        chainId,
        symbol,
        apiKey: process.env.FUNKIT_API_KEY,
      });
    }
    return NextResponse.json({ data, status: 200, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null, status: 500, error: error });
  }
}
