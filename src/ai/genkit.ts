/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize the Genkit AI instance with the Google AI plugin.
// This makes Google's Gemini models available for use in flows.
export const ai = genkit({
  plugins: [
    googleAI({
        // Other configuration can go here.
    }),
  ],
});
