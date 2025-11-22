/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 * It is updated to include the Groq plugin.
 */
import { genkit } from 'genkit';
// Comment out or remove the Google AI import if you are switching entirely
// import { googleAI } from '@genkit-ai/google-genai'; 

// Import the Groq plugin
import { groq } from 'genkitx-groq'; 
// The specific model constants (like llama3x70b) are usually imported 
// directly into the flow file where they are used.

// Initialize the Genkit AI instance with the Groq plugin.
// This requires the GROQ_API_KEY environment variable to be set.
export const ai = genkit({
  plugins: [
    // Add the Groq plugin
    groq({
        // The API key is automatically read from the GROQ_API_KEY environment variable
        // if no 'apiKey' field is provided here, but you can explicitly pass it:
        apiKey: process.env.GROQ_API_KEY, 
    }),
    // You can keep the Google AI plugin if you want both available:
    // googleAI({}),
  ],
});