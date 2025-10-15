
"use client";

import { useState } from "react";
import { useAiContext } from "@/context/ai-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { explainText } from "@/ai/flows/explain-text-flow";
import { Loader2 } from "lucide-react";

export default function AiQueryDialog() {
  const { selectedText, isDialogOpen, closeDialog } = useAiContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!query || !selectedText) return;
    setIsLoading(true);
    setResult("");
    setIsSuccess(false);
    try {
      const response = await explainText({ text: selectedText, query });
      setResult(response);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error explaining text:", error);
      setResult("Sorry, I couldn't get an explanation. Please try again.");
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
      setResult("");
      setQuery("");
      setIsSuccess(false);
    }
  };

  const truncatedText =
    selectedText && selectedText.length > 100
      ? `${selectedText.substring(0, 100)}...`
      : selectedText;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Explain Medical Text</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium">Selected Text</label>
            <p className="text-sm text-muted-foreground p-2 bg-secondary rounded-md mt-1 h-auto min-h-10 flex items-center">
              {truncatedText}
            </p>
          </div>
          <div>
            <label htmlFor="query" className="text-sm font-medium">
              Your Question
            </label>
            <Input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What are the side effects?"
              className="mt-1"
            />
          </div>
          {(isLoading || result) && (
             <div>
              <label className="text-sm font-medium">Explanation</label>
                {isLoading && !result ? (
                    <div className="flex items-center justify-center h-32 mt-1 rounded-md border border-dashed">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <Textarea
                        readOnly
                        value={result}
                        className="mt-1 h-32"
                    />
                )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading || !query || isSuccess}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : isSuccess ? (
              "Done"
            ) : (
              "Get Explanation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
