"use client";
import {useEffect, useState} from "react";
import type {Location, MurdleData, Solution, Suspect, Weapon} from "@/lib/types";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import {extractHintsAction} from "@/app/actions";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  solution?: Solution;
  story?: Pick<MurdleData["story"], 'title' | 'intro' | 'setting' | 'victim'>;
  items?: {
    suspects: Suspect[];
    weapons: Weapon[];
    locations: Location[];
  };
  isFinalAccusation?: boolean;
  onAccuse?: (accusation: { suspect: string, weapon: string, location: string }) => void;
  status?: "accusing" | "failed";
}


export default function SolutionModal({
                                        isOpen,
                                        onClose,
                                        title,
                                        solution,
                                        story,
                                        items,
                                        isFinalAccusation,
                                        onAccuse,
                                        status
                                      }: SolutionModalProps) {
  const [accusation, setAccusation] = useState({suspect: "", weapon: "", location: ""});
  const [hints, setHints] = useState<string[]>([]);
  const [loadingHints, setLoadingHints] = useState(false);

  useEffect(() => {
    if (status === 'failed') {
      const timer = setTimeout(() => {
        onClose(); // This will set gameState back to 'playing'
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  useEffect(() => {
    if (solution && story && items) {
      const fetchHints = async () => {
        setLoadingHints(true);
        try {
          const result = await extractHintsAction({
            story: story.intro,
            suspects: items.suspects.map(s => s.name),
            weapons: items.weapons.map(w => w.name),
            locations: items.locations.map(l => l.name)
          });
          setHints(result.hints);
        } catch (e) {
          console.error("Failed to load hints", e);
        } finally {
          setLoadingHints(false);
        }
      };
      fetchHints();
    }
  }, [solution, story, items]);

  const handleAccuseClick = () => {
    if (onAccuse) {
      onAccuse(accusation);
    }
  };

  const renderContent = () => {
    if (isFinalAccusation && items && onAccuse) {
      return (
        <div className="space-y-4">
          {status === 'failed' && (
            <Alert variant="destructive" className="retro-frame !border-red-500">
              <AlertTitle className="font-bold text-blink">INCORRECT!</AlertTitle>
              <AlertDescription>Your accusation was wrong. The killer remains at large... Try again!</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label className="text-lg font-bold">THE KILLER IS:</label>
            <Select onValueChange={(v) => setAccusation(a => ({...a, suspect: v}))}>
              <SelectTrigger className="retro-select"><SelectValue placeholder="Select Suspect..."/></SelectTrigger>
              <SelectContent
                className="font-code bg-black border-primary text-primary retro-frame-inset">{items.suspects.map(s =>
                <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-bold">THE WEAPON WAS:</label>
            <Select onValueChange={(v) => setAccusation(a => ({...a, weapon: v}))}>
              <SelectTrigger className="retro-select"><SelectValue placeholder="Select Weapon..."/></SelectTrigger>
              <SelectContent
                className="font-code bg-black border-primary text-primary retro-frame-inset">{items.weapons.map(w =>
                <SelectItem key={w.name} value={w.name}>{w.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-lg font-bold">THE LOCATION WAS:</label>
            <Select onValueChange={(v) => setAccusation(a => ({...a, location: v}))}>
              <SelectTrigger className="retro-select"><SelectValue placeholder="Select Location..."/></SelectTrigger>
              <SelectContent
                className="font-code bg-black border-primary text-primary retro-frame-inset">{items.locations.map(l =>
                <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Button onClick={handleAccuseClick}
                  disabled={!accusation.suspect || !accusation.weapon || !accusation.location}
                  className="retro-button w-full !bg-destructive mt-4">CONFIRM ACCUSATION</Button>
        </div>
      );
    }

    if (solution) {
      return (
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 text-lime-300 font-code">
            <p className="text-lg">THE KILLER: <span className="text-primary font-bold">{solution.suspect}</span></p>
            <p className="text-lg">THE WEAPON: <span className="text-primary font-bold">{solution.weapon}</span></p>
            <p className="text-lg">THE LOCATION: <span className="text-primary font-bold">{solution.location}</span></p>

            <div className="retro-frame-inset p-4">
              <h3 className="retro-text-glow-cyan text-xl mb-2">REVEAL NARRATIVE</h3>
              <p className="whitespace-pre-wrap">{solution.reveal_narrative}</p>
            </div>

            <div className="retro-frame-inset p-4">
              <h3 className="retro-text-glow-cyan text-xl mb-2">STORY HINTS YOU MIGHT HAVE MISSED</h3>
              {loadingHints ? (
                <p className="text-blink">ANALYZING DATA...</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {hints.map((hint, i) => <li key={i}>{hint}</li>)}
                </ul>
              )}
            </div>
            <Button onClick={onClose} className="retro-button w-full mt-4">PLAY AGAIN</Button>
          </div>
        </ScrollArea>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={isFinalAccusation && status !== 'failed' ? onClose : undefined}>
      <DialogContent
        className="max-w-2xl h-[80vh] retro-frame !bg-[#1d0a4e] border-accent shadow-[0_0_20px_hsl(var(--accent))] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black retro-text-rainbow">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
