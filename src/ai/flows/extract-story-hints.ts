'use server';

/**
 * @fileOverview A flow to extract story hints from the generated Murdle content.
 *
 * - extractStoryHints - A function that extracts the story hints.
 * - ExtractStoryHintsInput - The input type for the extractStoryHints function.
 * - ExtractStoryHintsOutput - The return type for the extractStoryHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractStoryHintsInputSchema = z.object({
  story: z.string().describe('The story narrative.'),
  suspects: z
    .array(z.string())
    .describe('List of suspect names in the story.'),
  weapons: z.array(z.string()).describe('List of weapon names in the story.'),
  locations: z
    .array(z.string())
    .describe('List of location names in the story.'),
});
export type ExtractStoryHintsInput = z.infer<typeof ExtractStoryHintsInputSchema>;

const ExtractStoryHintsOutputSchema = z.object({
  hints: z
    .array(z.string())
    .describe('List of possible story hints extracted from the content.'),
});
export type ExtractStoryHintsOutput = z.infer<typeof ExtractStoryHintsOutputSchema>;

export async function extractStoryHints(
  input: ExtractStoryHintsInput
): Promise<ExtractStoryHintsOutput> {
  return extractStoryHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractStoryHintsPrompt',
  input: {schema: ExtractStoryHintsInputSchema},
  output: {schema: ExtractStoryHintsOutputSchema},
  prompt: `Given the following story, suspects, weapons and locations, extract a list of possible story hints that a player could use to solve the murder mystery. Story hints should be phrased as clues or observations a player might make while reading the story.

Story:
{{{story}}}

Suspects:
{{#each suspects}}{{{this}}}\n{{/each}}

Weapons:
{{#each weapons}}{{{this}}}\n{{/each}}

Locations:
{{#each locations}}{{{this}}}\n{{/each}}

Make sure the story hints are specific and relevant to the story. Focus on details that might help identify the murderer, weapon, or location.

Return a JSON object with a "hints" array containing the extracted story hints.`,
});

const extractStoryHintsFlow = ai.defineFlow(
  {
    name: 'extractStoryHintsFlow',
    inputSchema: ExtractStoryHintsInputSchema,
    outputSchema: ExtractStoryHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
