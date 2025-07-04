"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface GameSetupProps {
  onGenerate: (theme: string, difficulty: "Easy" | "Medium" | "Hard") => void;
  error: string | null;
}

const themes = [
  "Victorian Mansion",
  "Space Station",
  "Art Gallery",
  "Cruise Ship",
  "Tech Company",
  "Medieval Castle",
];

const difficulties = ["Easy", "Medium", "Hard"] as const;

export default function GameSetup({ onGenerate, error }: GameSetupProps) {
  const [theme, setTheme] = useState(themes[0]);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(theme, difficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-black retro-text-rainbow mb-2">
        RETRO SLEUTH AI
      </h1>
      <p className="text-lg retro-text-glow-cyan mb-8">
        AN AI-POWERED 90S MURDER MYSTERY GENERATOR
      </p>

      <div className="retro-frame w-full max-w-md">
        <div className="retro-frame-inset p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold retro-text-glow-pink">
              GENERATE A NEW MYSTERY
            </h2>
            <div className="space-y-2 text-left">
              <label className="text-lg font-bold">THEME:</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="retro-select">
                  <SelectValue placeholder="Select a theme..." />
                </SelectTrigger>
                <SelectContent className="font-code bg-black border-primary text-primary retro-frame-inset">
                  {themes.map((t) => (
                    <SelectItem key={t} value={t} className="focus:bg-primary/50 focus:text-white">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-lg font-bold">DIFFICULTY:</label>
              <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                <SelectTrigger className="retro-select">
                  <SelectValue placeholder="Select difficulty..." />
                </SelectTrigger>
                <SelectContent className="font-code bg-black border-primary text-primary retro-frame-inset">
                  {difficulties.map((d) => (
                    <SelectItem key={d} value={d} className="focus:bg-primary/50 focus:text-white">
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="retro-button w-full !bg-green-500 !text-black hover:!bg-green-400">
              START INVESTIGATION
            </Button>
          </form>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-8 max-w-md retro-frame !border-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-bold">GENERATION FAILED</AlertTitle>
          <AlertDescription>
            {error} PLEASE TRY AGAIN.
          </AlertDescription>
        </Alert>
      )}

      <div className="marquee mt-12">
        <span>
          LATEST NEWS: MYSTERIOUS EVENTS UNFOLDING... AI DETECTIVE ON THE CASE... CAN YOU CRACK THE CODE?... DOWNLOAD COMPLETE...
        </span>
      </div>
    </div>
  );
}
