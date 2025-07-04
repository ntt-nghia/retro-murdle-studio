"use client";

import { Button } from "@/components/ui/button";
import type { Suspect, Weapon, Location } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

interface AccusationFormProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  onAccuse: () => void;
}

export default function AccusationForm({ onAccuse }: AccusationFormProps) {
  return (
    <div className="retro-frame !border-destructive shadow-[0_0_15px_hsl(var(--destructive))]" data-tutorial="accusation-form">
        <div className="p-4 text-center space-y-4">
            <h2 className="text-2xl font-black retro-text-glow-pink flex items-center justify-center gap-2">
                <AlertTriangle className="text-destructive w-8 h-8 text-blink" />
                MAKE ACCUSATION
                <AlertTriangle className="text-destructive w-8 h-8 text-blink" />
            </h2>
            <p className="text-yellow-300 font-code">
                ARE YOU READY TO SOLVE THE CASE? THIS ACTION IS FINAL.
            </p>
            <Button onClick={onAccuse} className="retro-button !bg-destructive !text-white hover:!bg-red-700 w-full md:w-auto">
                I KNOW WHO DID IT
            </Button>
        </div>
    </div>
  );
}
