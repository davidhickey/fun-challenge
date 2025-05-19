import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse<T> = {
  data: T | null;
  status: number;
  error: string | null;
};

export async function GET(request: NextRequest) {
  try {
    if (!process.env.FUNKIT_API_KEY) {
      return NextResponse.json<ApiResponse<null>>({
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

    // Validate request type
    if (reqType !== "price" && reqType !== "erc20") {
      return NextResponse.json<ApiResponse<null>>({
        data: null,
        status: 400,
        error: `Invalid request type: ${reqType}. Must be either 'price' or 'erc20'`,
      });
    }

    let data = null;

    if (reqType === "price") {
      //getAssetPriceInfo logic
      if (!chainId || !assetTokenAddress) {
        return NextResponse.json<ApiResponse<null>>({
          data: null,
          status: 400,
          error: `Missing required parameters: chainId: ${chainId}, assetTokenAddress: ${assetTokenAddress}`,
        });
      }

      try {
        data = await getAssetPriceInfo({
          chainId,
          assetTokenAddress,
          apiKey: process.env.FUNKIT_API_KEY,
        });

        if (!data) {
          return NextResponse.json<ApiResponse<null>>({
            data: null,
            status: 404,
            error: "No price data found for the given token",
          });
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
        return NextResponse.json<ApiResponse<null>>({
          data: null,
          status: 500,
          error: "Failed to fetch price data",
        });
      }
    } else {
      //getAssetErc20ByChainAndSymbol logic
      if (!chainId || !symbol) {
        return NextResponse.json<ApiResponse<null>>({
          data: null,
          status: 400,
          error: `Missing required parameters: chainId: ${chainId}, symbol: ${symbol}`,
        });
      }

      try {
        data = await getAssetErc20ByChainAndSymbol({
          chainId,
          symbol,
          apiKey: process.env.FUNKIT_API_KEY,
        });

        if (!data) {
          return NextResponse.json<ApiResponse<null>>({
            data: null,
            status: 404,
            error: "No token data found for the given symbol",
          });
        }
      } catch (error) {
        console.error("Error fetching token data:", error);
        return NextResponse.json<ApiResponse<null>>({
          data: null,
          status: 500,
          error: "Failed to fetch token data",
        });
      }
    }

    return NextResponse.json<ApiResponse<typeof data>>({
      data,
      status: 200,
      error: null,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json<ApiResponse<null>>({
      data: null,
      status: 500,
      error: "An unexpected error occurred",
    });
  }
}
