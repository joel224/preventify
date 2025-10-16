"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "qrcode.react";

const WhatsAppBooking = ({ children }: { children: React.ReactNode }) => {
  const whatsappNumber = "15551515176";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment via WhatsApp</DialogTitle>
          <DialogDescription>
            Scan the QR code with your phone to start a conversation with us on
            WhatsApp.
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
            Or click here: <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-preventify-green underline">Open WhatsApp</a>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppBooking;
