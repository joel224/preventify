'use server';
/**
 * @fileOverview An AI flow to suggest a doctor based on symptoms.
 *
 * - suggestDoctor - A function that handles the doctor suggestion process.
 * - DoctorSuggestionInput - The input type for the suggestDoctor function.
 * - DoctorSuggestionOutput - The return type for the suggestDoctor function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';

const DoctorSchema = z.object({
    id: z.string().describe('The unique identifier for the doctor.'),
    name: z.string().describe('The name of the doctor.'),
    specialty: z.string().describe('The medical specialty of the doctor.'),
});

const DoctorSuggestionInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user.'),
  doctors: z.array(DoctorSchema).describe('A list of available doctors with their specialties.'),
});
export type DoctorSuggestionInput = z.infer<typeof DoctorSuggestionInputSchema>;

const DoctorSuggestionOutputSchema = z.object({
  doctorId: z.string().describe('The ID of the most suitable doctor from the provided list.'),
  reasoning: z.string().describe('A brief explanation for why this doctor was recommended.'),
});
export type DoctorSuggestionOutput = z.infer<typeof DoctorSuggestionOutputSchema>;


export async function suggestDoctor(input: DoctorSuggestionInput): Promise<DoctorSuggestionOutput> {
  return suggestDoctorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'suggestDoctorPrompt',
    input: { schema: DoctorSuggestionInputSchema },
    output: { schema: DoctorSuggestionOutputSchema },
    prompt: `
        You are an expert medical assistant. Your task is to recommend the most suitable doctor for a patient based on their symptoms.
        
        Here is the list of available doctors and their specialties:
        {{#each doctors}}
        - Doctor ID: {{id}}, Name: {{name}}, Specialty: {{specialty}}
        {{/each}}
        
        Here are the patient's symptoms:
        "{{{symptoms}}}"
        
        Analyze the symptoms and choose the doctor whose specialty is the best match.
        You MUST return the ID of one of the doctors from the list provided. Do not invent a doctor ID.
        Provide a very short, one-sentence reasoning for your choice.
    `,
});


const suggestDoctorFlow = ai.defineFlow(
  {
    name: 'suggestDoctorFlow',
    inputSchema: DoctorSuggestionInputSchema,
    outputSchema: DoctorSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input, {
      model: googleAI.model('gemini-flash-lite-latest'),
    });
    return output!;
  }
);
