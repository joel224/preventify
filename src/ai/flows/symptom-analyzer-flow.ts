'use server';
/**
 * @fileOverview An independent AI flow to analyze symptoms and suggest a doctor.
 * This flow is self-contained and does not rely on other existing AI flows.
 *
 * - analyzeSymptoms - A function that handles the doctor suggestion process based on symptoms.
 * - SymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptoms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { llama31x8bInstant } from 'genkitx-groq';

const DoctorSchema = z.object({
    id: z.string().describe('The unique identifier for the doctor.'),
    name: z.string().describe('The name of the doctor.'),
    specialty: z.string().describe('The medical specialty of the doctor.'),
});

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the patient\'s symptoms.'),
  doctors: z.array(DoctorSchema).describe('A list of available doctors with their specialties.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  recommendedDoctorId: z.string().describe('The ID of the most suitable doctor from the provided list.'),
  reasoning: z.string().describe('A brief, one-sentence explanation for why this doctor was recommended.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;


export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalyzerFlow(input);
}

const symptomAnalyzerPrompt = ai.definePrompt({
    name: 'symptomAnalyzerPrompt',
    input: { schema: SymptomAnalysisInputSchema },
    output: { schema: SymptomAnalysisOutputSchema },
    prompt: `
        You are an expert medical assistant. Your task is to analyze a patient's symptoms and recommend the most suitable doctor from the provided list.

        Available Doctors:
        {{#each doctors}}
        - ID: {{id}}, Name: {{name}}, Specialty: {{specialty}}
        {{/each}}

        Patient's Symptoms:
        "{{{symptoms}}}"

        Based on the symptoms, determine the best medical specialty required. Then, select the doctor from the list whose specialty is the closest match.

        You MUST return a JSON object with the ID of the recommended doctor and a brief reasoning. The output must strictly follow this format:
        {
          "recommendedDoctorId": "the-doctor-id-from-the-list",
          "reasoning": "A short, one-sentence explanation for your choice."
        }

        Do not invent a doctor ID. It must be one of the IDs from the list.
    `,
});


const symptomAnalyzerFlow = ai.defineFlow(
  {
    name: 'symptomAnalyzerFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await symptomAnalyzerPrompt(input, {
      model: llama31x8bInstant,
    });
    return output!;
  }
);
