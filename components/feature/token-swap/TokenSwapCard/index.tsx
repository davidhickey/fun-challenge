import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

const TokenSwapCard = ({
  title,
  fieldTitle,
  type,
  tokens,
}: {
  title: string;
  fieldTitle: string;
  type: string;
  tokens: string[];
}) => {
  return (
    <Card className={`${type}-card-container`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {fieldTitle && <span className="text-sm">{fieldTitle}</span>}
        <div className="flex flex-col md:flex-row gap-2 align-start justify-start">
          <Input placeholder="Amount" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <span className="text-sm"> Select Token</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {tokens.map((token) => (
                <DropdownMenuItem key={token}>{token}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSwapCard;
