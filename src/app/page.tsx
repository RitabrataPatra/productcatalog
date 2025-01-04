// import Image from "next/image";

import CardCatalog from "@/components/CardCatalog";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-3/4 mx-auto my-8">
      <Suspense fallback={<SkeletonCard/>}>
      <CardCatalog />
      </Suspense>
    </main>
  );
}
