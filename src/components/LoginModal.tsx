import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";
import Logo from "./Logo";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[9999999]">
        <DialogHeader>
          <Logo className="mx-auto" />
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-primary">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-primary">
              Your configuration was saved!
            </span>{" "}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <LoginLink className={buttonVariants({ variant: "default" })}>
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
