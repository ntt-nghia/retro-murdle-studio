import type { z } from "zod";
import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";

type ExtractedMurdleData = GenerateMurdleMysteryOutput["murdleData"];

export type MurdleData = ExtractedMurdleData;

export type Story = {
  title: string;
  intro: string;
  victim: {
    name: string;
    background: string;
    motive_for_murder: string;
  };
};

export type Suspect = {
  name: string;
  avatar: string;
  profession: string;
  description: string;
  traits: string;
};

export type Weapon = {
  name: string;
  icon: string;
  description: string;
  traits: string;
};

export type Location = {
  name: string;
  icon: string;
  description: string;
  traits: string;
};

export type Clue = {
  text: string;
  type: "elimination" | "relationship" | "conditional";
};

export type Solution = {
  suspect: string;
  weapon: string;
  location: string;
  motive: string;
  method: string;
  reveal_narrative: string;
};
