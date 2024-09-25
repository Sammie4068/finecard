import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-full inset-x-0 top-0 w-full bg-background/70 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex gap-0.5 items-center z-40 font-semibold"
          >
            Fine
            <span className="bg-primary text-secondary px-2 text-left">
              Card
            </span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={"/api/auth/logout"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Out
                </Link>
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
