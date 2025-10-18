
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QRCode from "qrcode.react";
import { useState } from "react";
import { Button } from "./ui/button";

const WhatsAppBooking = ({ children }: { children: React.ReactNode }) => {
  const whatsappNumber = "+918129334858";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const [qrCodeOpen, setQrCodeOpen] = useState(false);

  return (
    <Dialog open={qrCodeOpen} onOpenChange={setQrCodeOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => window.open(whatsappLink, '_blank')}>
            Chat on WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setQrCodeOpen(true)}>
            Scan QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book via WhatsApp</DialogTitle>
          <DialogDescription>
            Scan this QR code to start a chat with us on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <QRCode
            value={whatsappLink}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </div>
        <DialogDescription className="text-center">
          Or click here:{" "}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-preventify-green underline"
          >
            Open WhatsApp
          </a>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppBooking;
