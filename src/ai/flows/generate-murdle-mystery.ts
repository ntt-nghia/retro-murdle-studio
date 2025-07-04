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
      text: z.string().describe("The clue statement"),
      type: z.enum(["direct_statement", "elimination", "relationship"]).describe("Type of clue"),
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
  prompt: `You are a master mystery writer creating a Murdle-style logic puzzle game. Generate a complete murder mystery with rich storytelling and perfectly logical clues.

## REQUIREMENTS:
- **Theme**: {{{theme}}}
- **Difficulty**: {{{difficulty}}}
- **Suspects**: Exactly {{{suspectCount}}} suspects
- **Weapons**: Exactly {{{suspectCount}}} unique weapons
- **Locations**: Exactly {{{suspectCount}}} distinct locations

## CRITICAL LOGIC RULES:
1. **One Solution**: There must be exactly ONE logical solution. The clues must lead to a single, unambiguous answer for the suspect, weapon, and location.
2. **Solvable**: All clues must work together to eliminate possibilities. No guesswork should be required.
3. **No Contradictions**: Every clue must be consistent with the solution and all other clues.
4. **Balanced**: Each suspect should have a viable motive and opportunity. Red herrings should be plausible but ultimately disprovable with the given clues.
5. **Thematic**: All elements (characters, weapons, locations, story) should fit the chosen theme and tone.

Generate a compelling murder mystery with rich character development, atmospheric descriptions, and perfectly logical puzzle mechanics. Return ONLY valid JSON matching this structure:

\{
  "story": \{
    "title": "String - Compelling case title",
    "setting": "String - Detailed location description",
    "atmosphere": "String - Mood and ambiance",
    "intro": "String - Opening narrative that hooks the reader",
    "victim": \{
      "name": "String - Full name",
      "background": "String - Who they were, their importance",
      "motive_for_murder": "String - Why someone would want them dead"
    \}
  \},
  "suspects": [
    \{
      "name": "String - Full name",
      "avatar": "String - Emoji representation",
      "profession": "String - What they do",
      "description": "String - Brief character summary",
      "background": "String - Detailed backstory and personality",
      "motive": "String - Why they might want the victim dead",
      "relationship_to_victim": "String - How they knew the victim"
    \}
  ],
  "weapons": [
    \{
      "name": "String - Weapon name",
      "icon": "String - Emoji representation",
      "description": "String - Detailed description"
    \}
  ],
  "locations": [
    \{
      "name": "String - Location name",
      "icon": "String - Emoji representation",
      "description": "String - Atmospheric description"
    \}
  ],
  "clues": [
    \{
      "text": "String - The clue statement",
      "type": "String - direct_statement | elimination | relationship"
    \}
  ],
  "solution": \{
    "suspect": "String - Name of the murderer",
    "weapon": "String - Murder weapon",
    "location": "String - Where the murder occurred",
    "motive": "String - Why they did it",
    "method": "String - How the murder was committed",
    "reveal_narrative": "String - Dramatic revelation of the truth"
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
