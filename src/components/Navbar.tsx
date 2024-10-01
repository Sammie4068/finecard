import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Logo from "./Logo";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { db } from "@/db";
import type { Order } from "@prisma/client";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  let userData: Order[] | undefined;
  if (user) {
    userData = await db.order.findMany({
      where: {
        userId: user.id,
        isPaid: true,
      },
    });
  }

  return (
    <nav className="sticky z-[100] h-full inset-x-0 top-0 w-full bg-background/70 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href={"/purchases"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <Image
                    src={"/purchases.svg"}
                    alt="purchase icon"
                    width={20}
                    height={20}
                  />
                  <Badge className="rounded-2xl -ml-1">
                    {userData ? userData.length : 0}
                  </Badge>
                </Link>
                <Link
                  href={"/api/auth/logout"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Out
                </Link>
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/api/auth/register"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Up
                </Link>
                <Link
                  href={"/api/auth/login"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign In
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Card
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
