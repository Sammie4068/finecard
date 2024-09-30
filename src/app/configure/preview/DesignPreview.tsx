"use client";

import TemplateCard from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";
import { CardFinish, Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { color, finish } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  function calcTotalPrice(finishType: CardFinish) {
    if (!finishType) return BASE_PRICE;
    const total = BASE_PRICE + PRODUCT_PRICES.finish[finishType];
    return total;
  }

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    console.log(user);

    if (user) {
      // create payment session
      createPaymentSession({ configId: id });
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col m-auto items-center md:grid md:pl-40 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2 md:hidden">
          <TemplateCard
            className={cn(`bg-${tw}`, "max-w-[200px]")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-background text-center">
            Your Fine Card
          </h3>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-base text-background">
            <Check className="h-4 w-4 text-green-600" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-2 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 space-y-2">
                <li className="w-full flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-600" />
                  High-quality, durable material
                </li>
                <li className="w-full flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-600" />
                  100% Secure
                </li>
                <li className="w-full flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-600" />
                  All payment terminals compatible
                </li>
                <li className="w-full flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-600" />5 year print
                  warranty
                </li>
              </ol>
            </div>

            <div className="hidden md:block">
              <TemplateCard
                className={cn(`bg-${tw}`, "max-w-full")}
                imgSrc={configuration.croppedImageUrl!}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 capitalize">{finish} finish</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(
                      PRODUCT_PRICES.finish[finish as CardFinish] / 100
                    )}
                  </p>
                </div>

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(calcTotalPrice(finish!) / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Checking out"
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8 bg-secondary text-primary hover:bg-secondary/90 hover:text-primary/90 gap-2"
              >
                Check out <ArrowRight className="h-4 w-4 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
