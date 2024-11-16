import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioLanding } from "@/components/portfolio-landing";

export const metadata = {
  title: "AR Portfolio"
} satisfies Metadata;
export default function Home() {
  return (
    <Suspense>
      <PortfolioLanding />
    </Suspense>
  );
}
