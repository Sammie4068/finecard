import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OrderStatus } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      userId: user.id,
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shipment",
    fulfilled: "Fulfilled",
    shipped: "Shipped",
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-100 grainy-dark">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          {orders.length < 1 ? (
            <div className="flex  flex-col items-center justify-center gap mt-10">
              <h1 className="text-4xl font-bold tracking-tight text-secondary mb-2">
                No Purchases!
              </h1>
              <p className="text-xl text-accent text-center mb-4">
                You have not made any purchases yet, click the button below to
                make a purchase
              </p>
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "lg",
                  className:
                    " bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:text-secondary-foreground flex items-center gap-1",
                })}
              >
                Create Case
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="p-3 sm:p-0">
              <h1 className="text-4xl font-bold tracking-tight text-secondary mb-4">
                Purchases
              </h1>
              <Table className="mb-20">
                <TableHeader className="text-xl text-background">
                  <TableRow>
                    <TableHead className="text-background">Customer</TableHead>
                    <TableHead className="text-background">Status</TableHead>
                    <TableHead className="hidden sm:table-cell text-background">
                      Purchase date
                    </TableHead>
                    <TableHead className="text-right hidden sm:table-cell text-background">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium">
                          {order.shippingAddress?.name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {" "}
                        {LABEL_MAP[order.status as OrderStatus]}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right hidden sm:table-cell">
                        {formatPrice(order.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
