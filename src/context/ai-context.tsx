
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AiContextType {
  selectedText: string | null;
  isMenuOpen: boolean;
  menuPosition: { x: number; y: number };
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  closeMenu: () => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export function AiContextProvider({ children }: { children: ReactNode }) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      // Small delay to allow click events on the menu to register before checking selection
      setTimeout(() => {
         const selection = window.getSelection();
         const text = selection?.toString().trim();
         
         if (text && text.length > 0) {
           const range = selection!.getRangeAt(0);
           const rect = range.getBoundingClientRect();
           
           // If a popover content element is an ancestor of the click, don't show the menu
           const targetElement = event.target as Element;
           if(targetElement.closest('[data-radix-popper-content-wrapper]')) {
             if(!isDialogOpen) {
                // this is a click on the popover, don't hide the menu
             } else {
                setIsMenuOpen(false);
             }
             return;
           }

           setSelectedText(text);
           setMenuPosition({
             x: rect.left + window.scrollX + rect.width / 2,
             y: rect.bottom + window.scrollY,
           });
           // Only open menu if dialog isn't already open
           if (!isDialogOpen) {
            setIsMenuOpen(true);
           }
         } else {
            // If the click is outside the dialog, and not on the popover, close the menu
            const targetElement = event.target as Element;
            if (!targetElement.closest('[role="dialog"]') && !targetElement.closest('[data-radix-popper-content-wrapper]')) {
                setIsMenuOpen(false);
            }
         }
      }, 10);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDialogOpen]);

  const openDialog = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(false); // Close the small popover when dialog opens
  }
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedText(null); // Clear selected text only when dialog is closed
    setIsMenuOpen(false);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Don't clear selected text when just closing the menu
  }

  return (
    <AiContext.Provider value={{ selectedText, isMenuOpen, menuPosition, isDialogOpen, openDialog, closeDialog, closeMenu }}>
      {children}
    </AiContext.Provider>
  );
}

export function useAiContext() {
  const context = useContext(AiContext);
  if (context === undefined) {
    throw new Error("useAiContext must be used within an AiContextProvider");
  }
  return context;
}
