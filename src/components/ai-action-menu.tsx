"use client";

import { useAiContext } from "@/context/ai-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import AiQueryDialog from "./ai-query-dialog";

export default function AiActionMenu() {
  const { 
    isMenuOpen, 
    menuPosition,
    closeMenu,
    isDialogOpen,
    openDialog
  } = useAiContext();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeMenu();
    }
  };

  if (isDialogOpen) return <AiQueryDialog />;

  return (
    <Popover open={isMenuOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          style={{
            position: "absolute",
            left: menuPosition.x,
            top: menuPosition.y,
            width: 0,
            height: 0,
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            openDialog();
            closeMenu();
          }}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Explain this
        </Button>
      </PopoverContent>
    </Popover>
  );
}
