'use server';
/**
 * @fileOverview Genkit flow for generating Murdle-style mysteries based on user-selected themes and difficulty.
 *
 * - generateMurdleMystery - A function that generates a Murdle mystery.
 * - GenerateMurdleMysteryInput - The input type for a Murdle mystery.
 * - GenerateMurdleMysteryOutput - The return type for a Murdle mystery.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMurdleMysteryInputSchema = z.object({
  theme: z.string().describe('The theme of the Murdle mystery.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the Murdle mystery.'),
  suspectCount: z.number().describe('The number of suspects, weapons, and locations.'),
});
export type GenerateMurdleMysteryInput = z.infer<typeof GenerateMurdleMysteryInputSchema>;

const MurdleDataSchema = z.object({
    story: z.object({
      title: z.string().describe("Compelling case title"),
      setting: z.string().describe("Detailed location description"),
      atmosphere: z.string().describe("Mood and ambiance"),
      intro: z.string().describe("Opening narrative that hooks the reader"),
      victim: z.object({
        name: z.string().describe("Full name"),
        background: z.string().describe("Who they were, their importance"),
        motive_for_murder: z.string().describe("Why someone would want them dead")
      })
    }),
    suspects: z.array(z.object({
      name: z.string().describe("Full name"),
      avatar: z.string().describe("Emoji representation"),
      profession: z.string().describe("What they do"),
      description: z.string().describe("Brief character summary"),
      background: z.string().describe("Detailed backstory and personality"),
motive: z.string().describe("Why they might want the victim dead"),
      relationship_to_victim: z.string().describe("How they knew the victim")
    })),
    weapons: z.array(z.object({
      name: z.string().describe("Weapon name"),
      icon: z.string().describe("Emoji representation"),
      description: z.string().describe("Detailed description")
    })),
    locations: z.array(z.object({
      name: z.string().describe("Location name"),
      icon: z.string().describe("Emoji representation"),
      description: z.string().describe("Atmospheric description")
    })),
    clues: z.array(z.object({
      text: z.string().describe("The clue statement, which should allow players to make logical deductions."),
      type: z.enum(["direct_statement", "elimination", "relationship"]).describe("Type of clue, which determines how players can use it to solve the mystery."),
    })),
    solution: z.object({
      suspect: z.string().describe("Name of the murderer"),
      weapon: z.string().describe("Murder weapon"),
      location: z.string().describe("Where the murder occurred"),
      motive: z.string().describe("Why they did it"),
      method: z.string().describe("How the murder was committed"),
      reveal_narrative: z.string().describe("Dramatic revelation of the truth")
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
  prompt: `You are a master mystery writer creating a Murdle-style logic puzzle game. Generate a complete murder mystery with rich storytelling and perfectly logical clues designed to be solved using a deduction grid.

## REQUIREMENTS:
- **Theme**: {{{theme}}}
- **Difficulty**: {{{difficulty}}}
- **Suspects**: Exactly {{{suspectCount}}} suspects
- **Weapons**: Exactly {{{suspectCount}}} unique weapons
- **Locations**: Exactly {{{suspectCount}}} distinct locations

## CRITICAL LOGIC RULES:
1.  **One Solution**: There must be exactly ONE logical solution. The clues MUST lead to a single, unambiguous answer for the suspect, weapon, and location.
2.  **Solvable by Deduction**: The puzzle must be solvable *only* by using the clues to eliminate possibilities on a deduction grid. No outside knowledge or leaps of logic should be required.
3.  **Clue Design**: Generate clues that directly support grid-based deduction. They should be clear, concise, and focused on relationships between suspects, weapons, and locations.
    *   **Elimination Clues**: "The [WEAPON] was not used." or "The murder did not happen in the [LOCATION]."
    *   **Relationship Clues**: "[SUSPECT] was not in the [LOCATION]." or "The person who used the [WEAPON] was not [SUSPECT]." or "The murder in the [LOCATION] did not involve the [WEAPON]."
    *   **Direct Statements**: "The victim was not poisoned."
4.  **No Contradictions**: Every clue must be consistent with the solution and all other clues.
5.  **Balanced**: Each suspect should have a viable motive. Red herrings should be plausible but ultimately disprovable *with the given clues*.
6.  **Thematic Cohesion**: All elements (characters, weapons, locations, story) must fit the chosen theme and tone.

Generate a compelling murder mystery with rich character development, atmospheric descriptions, and a perfectly logical puzzle at its heart. Return ONLY valid JSON matching the specified output schema.
`,
});

const generateMurdleMysteryFlow = ai.defineFlow(
  {
    name: 'generateMurdleMysteryFlow',
    inputSchema: GenerateMurdleMysteryInputSchema,
    outputSchema: GenerateMurdleMysteryOutputSchema,
  },
// @ts-ignore
  async input => {
    const {output} = await prompt(input);
    return {
      murdleData: output!,
    };
  }
);
