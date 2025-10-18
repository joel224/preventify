/**
 * @fileoverview This file initializes the Genkit AI instance.
 *
 * It is used to define and configure AI models, flows, and other
 * Genkit functionalities. This central setup ensures that the same
 * AI configuration is used throughout the application.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize the Genkit AI instance with the Google AI plugin.
// This makes Google's generative models available for use in the application.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
