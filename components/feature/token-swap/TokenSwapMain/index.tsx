import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TokenSwapCard from "../TokenSwapCard";

const TokenSwapMain = () => {
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
