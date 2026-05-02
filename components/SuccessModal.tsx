"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  continueLabel: string;
};

export function SuccessModal({
  open,
  onClose,
  title,
  message,
  continueLabel,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="border-gold-main/35">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-base text-medium-grey">
            {message}
          </DialogDescription>
        </DialogHeader>
        <Button size="lg" className="w-full" type="button" onClick={onClose}>
          {continueLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
