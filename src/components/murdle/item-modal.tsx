"use client";

import { useState } from "react";
import type { Suspect, Weapon, Location } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type Item = Suspect | Weapon | Location;

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  type: "suspects" | "weapons" | "locations";
}

const ItemCard = ({ item, onClick }: { item: Item; onClick: () => void }) => (
  <div
    className="retro-frame p-2 cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-primary/20"
    onClick={onClick}
  >
    <div className="text-6xl">{(item as Suspect).avatar || (item as Weapon).icon || (item as Location).icon}</div>
    <p className="text-center font-bold h-10">{item.name}</p>
  </div>
);

const ItemDetail = ({ item, onBack }: { item: Item; onBack: () => void }) => (
  <div className="p-4 space-y-4">
    <Button onClick={onBack} className="retro-button mb-4">
      <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO LIST
    </Button>
    <div className="flex flex-col md:flex-row gap-4 items-center">
       <div className="text-8xl">{(item as Suspect).avatar || (item as Weapon).icon || (item as Location).icon}</div>
       <div className="flex-1">
         <h3 className="text-2xl font-black retro-text-glow-pink">{item.name}</h3>
         {'profession' in item && <p className="text-lg retro-text-glow-cyan">{item.profession}</p>}
       </div>
    </div>
    <div className="retro-frame-inset p-4 font-code text-lime-300">
      <ScrollArea className="h-64">
        <p className="whitespace-pre-wrap">{item.description}</p>
        {'background' in item && <p className="mt-4 whitespace-pre-wrap">BACKGROUND: {item.background}</p>}
        {'motive' in item && <p className="mt-4 whitespace-pre-wrap">MOTIVE: {item.motive}</p>}
        {'story_connection' in item && <p className="mt-4 whitespace-pre-wrap">STORY CONNECTION: {item.story_connection}</p>}
      </ScrollArea>
    </div>
  </div>
);

export default function ItemModal({ isOpen, onClose, items, type }: ItemModalProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleClose = () => {
    setSelectedItem(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[90vh] retro-frame !bg-[#2D0B69] border-primary shadow-[0_0_20px_hsl(var(--primary))] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-3xl font-black retro-text-rainbow">
            {selectedItem ? selectedItem.name : type.toUpperCase()}
          </DialogTitle>
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground !text-white">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            {selectedItem ? (
              <ItemDetail item={selectedItem} onBack={() => setSelectedItem(null)} />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {items.map((item) => (
                  <ItemCard key={item.name} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
