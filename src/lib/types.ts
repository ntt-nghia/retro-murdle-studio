import type { z } from "zod";
import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";

type ExtractedMurdleData = GenerateMurdleMysteryOutput["murdleData"];

export type MurdleData = ExtractedMurdleData;
export type Suspect = MurdleData["suspects"][0];
export type Weapon = MurdleData["weapons"][0];
export type Location = MurdleData["locations"][0];
export type Clue = MurdleData["clues"][0];
export type Solution = MurdleData["solution"];
