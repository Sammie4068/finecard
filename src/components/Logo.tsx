import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

export default function Logo({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Link
      href="/"
      className={cn(
        "flex gap-0.5 items-center z-40 font-semibold shadow-2xl",
        className
      )}
    >
      Fine
      <span className="bg-primary text-secondary px-2 text-left">Card</span>
    </Link>
  );
}
