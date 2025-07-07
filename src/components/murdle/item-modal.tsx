"use client";

import type {Location, Suspect, Weapon} from "@/lib/types";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ScrollArea} from "../ui/scroll-area";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

type Item = Suspect | Weapon | Location;

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  type: "suspects" | "weapons" | "locations";
}

export default function ItemModal({isOpen, onClose, items, type}: ItemModalProps) {
  const formatTraits = (traits: string) => {
    // Split by bullet points and clean up each trait
    return traits.split('•').map(trait => trait.trim()).filter(trait => trait.length > 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl h-[90vh] retro-frame !bg-[#2D0B69] border-primary shadow-[0_0_20px_hsl(var(--primary))] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-3xl font-black retro-text-rainbow">
            {type.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <Accordion type="single" collapsible className="w-full p-4 space-y-2">
              {items.map((item) => (
                <AccordionItem value={item.name} key={item.name} className="retro-frame !border-accent/50 bg-black/20">
                  <AccordionTrigger className="w-full p-4 hover:bg-primary/20 text-left">
                    <div className="flex items-center gap-4">
                      <div
                        className="text-6xl">{(item as Suspect).avatar || (item as Weapon).icon || (item as Location).icon}</div>
                      <div className="flex-1">
                        <p className="text-xl font-bold">{item.name}</p>
                        {'profession' in item &&
                            <p className="text-md retro-text-glow-cyan normal-case">{item.profession}</p>}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t-2 border-accent/50">
                    <div className="p-4 space-y-4 font-code text-lime-300">
                      <p className="whitespace-pre-wrap">{item.description}</p>

                      <div className="mt-4">
                        <p className="text-amber-400 font-bold mb-2">DISTINCTIVE TRAITS:</p>
                        <ul className="list-none space-y-1">
                          {formatTraits(item.traits).map((trait, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-accent">▸</span>
                              <span>{trait}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
