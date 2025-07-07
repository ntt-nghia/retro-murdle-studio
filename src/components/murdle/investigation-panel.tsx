"use client";

import React from "react";
import type {Location, Suspect, Weapon} from "@/lib/types";

interface InvestigationPanelProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
}

export default function InvestigationPanel({
                                             suspects,
                                             weapons,
                                             locations
                                           }: InvestigationPanelProps) {
  const formatTraits = (traits: string) => {
    return traits.split('•').map(trait => trait.trim()).filter(trait => trait.length > 0);
  };

  const SuspectCard = ({suspect}: { suspect: Suspect }) => (
    <div className="retro-frame !border-primary/50 bg-black/30 p-2 mb-2">
      <div className="flex items-start gap-2">
        <div className="text-3xl flex-shrink-0">{suspect.avatar}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base retro-text-glow-pink mb-1">{suspect.name}</h3>
          <p className="text-xs text-cyan-300 mb-1 normal-case">{suspect.profession}</p>
          <p className="text-xs text-lime-300 leading-relaxed">
            {formatTraits(suspect.traits).join(' • ')}
          </p>
        </div>
      </div>
    </div>
  );

  const WeaponCard = ({weapon}: { weapon: Weapon }) => (
    <div className="retro-frame !border-accent/50 bg-black/30 p-2 mb-2">
      <div className="flex items-start gap-2">
        <div className="text-3xl flex-shrink-0">{weapon.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base retro-text-glow-cyan mb-1">{weapon.name}</h3>
          <p className="text-xs text-gray-300 mb-1 normal-case leading-tight">{weapon.description}</p>
          <p className="text-xs text-lime-300 leading-relaxed">
            {formatTraits(weapon.traits).join(' • ')}
          </p>
        </div>
      </div>
    </div>
  );

  const LocationCard = ({location}: { location: Location }) => (
    <div className="retro-frame !border-yellow-500/50 bg-black/30 p-2 mb-2">
      <div className="flex items-start gap-2">
        <div className="text-3xl flex-shrink-0">{location.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base retro-text-glow-yellow mb-1">{location.name}</h3>
          <p className="text-xs text-gray-300 mb-1 normal-case leading-tight">{location.description}</p>
          <p className="text-xs text-lime-300 leading-relaxed">
            {formatTraits(location.traits).join(' • ')}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="retro-frame" data-tutorial="investigation-panel">
      <h2 className="text-xl font-black retro-text-rainbow p-2 text-center">INVESTIGATION PANEL</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2">
        {/* Suspects Column */}
        <div className="space-y-1">
          <div className="retro-frame !border-primary bg-primary/10 p-1">
            <h3 className="text-lg font-black retro-text-glow-pink text-center">SUSPECTS</h3>
          </div>
          <div>
            {suspects.map((suspect) => (
              <SuspectCard key={suspect.name} suspect={suspect}/>
            ))}
          </div>
        </div>

        {/* Weapons Column */}
        <div className="space-y-1">
          <div className="retro-frame !border-accent bg-accent/10 p-1">
            <h3 className="text-lg font-black retro-text-glow-cyan text-center">WEAPONS</h3>
          </div>
          <div>
            {weapons.map((weapon) => (
              <WeaponCard key={weapon.name} weapon={weapon}/>
            ))}
          </div>
        </div>

        {/* Locations Column */}
        <div className="space-y-1">
          <div className="retro-frame !border-yellow-500 bg-yellow-500/10 p-1">
            <h3 className="text-lg font-black retro-text-glow-yellow text-center">LOCATIONS</h3>
          </div>
          <div>
            {locations.map((location) => (
              <LocationCard key={location.name} location={location}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
