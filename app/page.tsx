import TokenSwapMain from "@/components/feature/token-swap/TokenSwapMain";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <TokenSwapMain />
      </main>
    </div>
  );
}
