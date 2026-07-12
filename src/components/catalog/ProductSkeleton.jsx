import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-white/45 backdrop-blur-md border border-white/30 rounded-3xl p-4">
      <Skeleton className="aspect-square rounded-2xl bg-[#A8D8EA]/10" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-3 w-20 rounded-full bg-[#A8D8EA]/10" />
        <Skeleton className="h-5 w-3/4 rounded-full bg-[#A8D8EA]/10" />
        <Skeleton className="h-3 w-full rounded-full bg-[#A8D8EA]/10" />
        <Skeleton className="h-3 w-2/3 rounded-full bg-[#A8D8EA]/10" />
        <div className="flex justify-between items-center pt-3">
          <Skeleton className="h-7 w-16 rounded-full bg-[#A8D8EA]/10" />
          <Skeleton className="h-10 w-24 rounded-2xl bg-[#A8D8EA]/10" />
        </div>
      </div>
    </div>
  );
}