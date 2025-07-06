"use server";

import {
  generateMurdleMystery,
  type GenerateMurdleMysteryInput,
  type GenerateMurdleMysteryOutput,
} from "@/ai/flows/generate-murdle-mystery";
import {
  extractStoryHints,
  type ExtractStoryHintsInput,
  type ExtractStoryHintsOutput,
} from "@/ai/flows/extract-story-hints";

export async function generateMysteryAction(
  input: GenerateMurdleMysteryInput
): Promise<GenerateMurdleMysteryOutput | null> {
  console.log("Generating mystery with input:", input);
  try {
    return await generateMurdleMystery(input);
  } catch (error) {
    console.error("Error in generateMysteryAction:", error);
    // It's better to throw the error so the client can handle it specifically
    throw new Error("Failed to generate mystery. Please try a different theme.");
  }
}

export async function extractHintsAction(
  input: ExtractStoryHintsInput
): Promise<ExtractStoryHintsOutput> {
  console.log("Extracting hints with input:", input);
  return await extractStoryHints(input);
}
