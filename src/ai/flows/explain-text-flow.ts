'use server';
/**
 * @fileOverview An AI flow to explain a piece of text.
 *
 * - explainText - A function that takes a text and a query and returns an explanation.
 * - ExplainTextInputSchema - The input type for the explainText function.
 * - ExplainTextOutputSchema - The return type for the explainText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainTextInputSchema = z.object({
  text: z.string().describe('The text to be explained.'),
  query: z.string().describe('The user\'s question about the text.'),
});
export type ExplainTextInput = z.infer<typeof ExplainTextInputSchema>;

export async function explainText(input: ExplainTextInput): Promise<string> {
  const llmResponse = await explainTextFlow(input);
  return llmResponse;
}

const prompt = `You are an expert at explaining complex topics in simple terms.
A user has selected the following text from a webpage:
---
{{text}}
---

The user has the following question about the text: "{{query}}"

Please provide a clear and concise explanation that directly answers the user's question based on the provided text.
If the text doesn't contain enough information to answer the question, say so.
Do not assume any prior knowledge.
Keep your explanation to a few sentences.`;

const explainTextFlow = ai.defineFlow(
  {
    name: 'explainTextFlow',
    inputSchema: ExplainTextInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-pro',
      input: {
        text: input.text,
        query: input.query,
      }
    });

    return output ?? "I'm sorry, I couldn't generate an explanation. Please try again.";
  }
);
