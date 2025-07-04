'use server';
/**
 * @fileOverview Genkit flow for generating Murdle-style mysteries based on user-selected themes and difficulty.
 *
 * - generateMurdleMystery - A function that generates a Murdle mystery.
 * - GenerateMurdleMysteryInput - The input type for the generateMurdleMystery function.
 * - GenerateMurdleMysteryOutput - The return type for the generateMurdleMystery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMurdleMysteryInputSchema = z.object({
  theme: z.string().describe('The theme of the Murdle mystery.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the Murdle mystery.'),
});
export type GenerateMurdleMysteryInput = z.infer<typeof GenerateMurdleMysteryInputSchema>;

const MurdleDataSchema = z.object({
    story: z.object({
      title: z.string().describe("Compelling case title"),
      setting: z.string().describe("Atmospheric location"),
      intro: z.string().describe("Multi-paragraph narrative"),
      victim: z.object({
        name: z.string().describe("Full victim name"),
        background: z.string().describe("Who they were"),
        motive_for_murder: z.string().describe("Why someone wanted them dead")
      })
    }),
    suspects: z.array(z.object({
      name: z.string().describe("Full suspect name"),
      avatar: z.string().describe("Emoji representation"),
      profession: z.string().describe("What they do"),
      description: z.string().describe("Brief summary"),
      background: z.string().describe("Detailed backstory"),
      motive: z.string().describe("Why they want victim dead"),
      relationship_to_victim: z.string().describe("Connection to victim"),
      story_hints: z.string().describe("Behavioral tells in narrative")
    })),
    weapons: z.array(z.object({
      name: z.string().describe("Weapon name"),
      icon: z.string().describe("Emoji representation"),
      description: z.string().describe("Detailed description"),
      story_connection: z.string().describe("How weapon appears in story")
    })),
    locations: z.array(z.object({
      name: z.string().describe("Location name"),
      icon: z.string().describe("Emoji representation"),
      description: z.string().describe("Atmospheric description"),
      story_connection: z.string().describe("Significance in narrative")
    })),
    clues: z.array(z.object({
      text: z.string().describe("Clue statement"),
      type: z.string().describe("direct_statement|elimination|relationship|puzzle"),
      isPuzzle: z.boolean().describe("Whether requires solving"),
      puzzleType: z.string().describe("caesar|anagram|etc"),
      solution: z.string().describe("Puzzle answer"),
      hint: z.string().describe("Help text for puzzle")
    })),
    solution: z.object({
      suspect: z.string().describe("Murderer name"),
      weapon: z.string().describe("Murder weapon"),
      location: z.string().describe("Murder location"),
      motive: z.string().describe("Why they did it"),
      method: z.string().describe("How murder was committed"),
      reveal_narrative: z.string().describe("Dramatic solution explanation"),
      story_connections: z.array(z.string()).describe("Array of story hints player should have noticed")
    })
  });

const GenerateMurdleMysteryOutputSchema = z.object({
  murdleData: MurdleDataSchema,
});
export type GenerateMurdleMysteryOutput = z.infer<typeof GenerateMurdleMysteryOutputSchema>;

export async function generateMurdleMystery(input: GenerateMurdleMysteryInput): Promise<GenerateMurdleMysteryOutput> {
  return generateMurdleMysteryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMurdleMysteryPrompt',
  input: {schema: GenerateMurdleMysteryInputSchema},
  output: {schema: GenerateMurdleMysteryOutputSchema},
  prompt: `Generate a Murdle-style mystery based on the following theme and difficulty:

Theme: {{{theme}}}
Difficulty: {{{difficulty}}}

Follow the schema below:
\{
  story: \{
    title: "String - Compelling case title",
    setting: "String - Atmospheric location",
    intro: "String - Multi-paragraph narrative", 
    victim: \{
      name: "String - Full victim name",
      background: "String - Who they were",
      motive_for_murder: "String - Why someone wanted them dead"
    \}
  \},
  suspects: [
    \{
      name: "String - Full suspect name",
      avatar: "String - Emoji representation",
      profession: "String - What they do", 
      description: "String - Brief summary",
      background: "String - Detailed backstory",
      motive: "String - Why they want victim dead",
      relationship_to_victim: "String - Connection to victim",
      story_hints: "String - Behavioral tells in narrative"
    \}
  ],
  weapons: [
    \{
      name: "String - Weapon name",
      icon: "String - Emoji representation",
      description: "String - Detailed description",
      story_connection: "String - How weapon appears in story"
    \}
  ],
  locations: [
    \{
      name: "String - Location name",
      icon: "String - Emoji representation", 
      description: "String - Atmospheric description",
      story_connection: "String - Significance in narrative"
    \}
  ],
  clues: [
    \{
      text: "String - Clue statement",
      type: "String - direct_statement|elimination|relationship|puzzle",
      isPuzzle: "Boolean - Whether requires solving",
      puzzleType: "String - caesar|anagram|etc",
      solution: "String - Puzzle answer", 
      hint: "String - Help text for puzzle"
    \}
  ],
  solution: \{
    suspect: "String - Murderer name",
    weapon: "String - Murder weapon",
    location: "String - Murder location", 
    motive: "String - Why they did it",
    method: "String - How murder was committed",
    reveal_narrative: "String - Dramatic solution explanation",
    story_connections: ["Array of story hints player should have noticed"]
  \}
\}

Ensure the output is valid JSON.
`,
});

const generateMurdleMysteryFlow = ai.defineFlow(
  {
    name: 'generateMurdleMysteryFlow',
    inputSchema: GenerateMurdleMysteryInputSchema,
    outputSchema: GenerateMurdleMysteryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      murdleData: output!,
    };
  }
);
