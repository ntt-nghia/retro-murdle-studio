"use client";

import React from "react";
import {Check, HelpCircle, X} from "lucide-react";
import type {Location, Suspect, Weapon} from "@/lib/types";

type CellState = "empty" | "x" | "check" | "question";

interface DeductionGridProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  gridState: { [key: string]: CellState };
  onCellClick: (key: string) => void;
}

export default function DeductionGrid({suspects, weapons, locations, gridState, onCellClick}: DeductionGridProps) {
  const categories = [
    {title: 'Suspects', items: suspects},
    {title: 'Weapons', items: weapons},
    {title: 'Locations', items: locations},
  ].filter(c => c.items && c.items.length > 0);

  const columnCategories = [categories[0], ...categories.slice(2)];

  const rowCategories = categories.slice(1);

  const GridCell = ({state, onClick}: { state: CellState, onClick: () => void }) => (
    <div
      className="w-12 h-12 flex items-center justify-center cursor-pointer bg-black/70 border border-gray-500 rounded hover:bg-accent/20 hover:border-accent transition-all"
      onClick={onClick}
    >
      {state === 'x' && <X className="w-8 h-8 text-red-500"/>}
      {state === 'check' && <Check className="w-8 h-8 text-green-500"/>}
      {state === 'question' && <HelpCircle className="w-8 h-8 text-yellow-500"/>}
    </div>
  );

  const CategoryHeader = ({category, orientation}: { category: any, orientation: 'horizontal' | 'vertical' }) => (
    <div
      className={orientation === 'vertical' ? 'flex flex-row gap-3 justify-center items-center h-full' : 'flex flex-col gap-3 justify-center items-center'}>
      {/* Category Title */}
      <div className={`font-black text-lg retro-text-glow-cyan uppercase tracking-wider ${
        orientation === 'vertical' ? '[writing-mode:sideways-lr]' : 'text-center'
      }`}>
        {category.title}
      </div>

      {/* Icons Container */}
      <div className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-row justify-center items-center'}`}>
        {category.items.map((item: any) => (
          <div key={item.name} className="flex flex-col items-center gap-1" title={item.name}>
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl bg-black/50 border border-white/30 rounded">
              {item.icon || item.avatar || item.name.charAt(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const SubGrid = ({rowCategory, colCategory}: { rowCategory: any, colCategory: any }) => {
    const colCount = colCategory.items.length;

    return (
      <div
        className="grid gap-1 p-2 bg-black/50 rounded overflow-clip"
        style={{gridTemplateColumns: `repeat(${colCount}, 1fr)`}}
      >
        {rowCategory.items.map((rowItem: any) =>
          colCategory.items.map((colItem: any) => {
            const keyParts = [rowItem.name, colItem.name].sort();
            const key = keyParts.join('-');
            return (
              <GridCell
                key={key}
                state={gridState[key] || 'empty'}
                onClick={() => onCellClick(key)}
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4 overflow-x-auto" data-tutorial="deduction-grid">
      <div className="bg-black/30 p-4 rounded-lg border-2 border-gray-600">
        <table className="border-separate border-spacing-2">
          <thead>
          <tr>
            {/* Empty top-left corner */}
            <th className=""></th>
            {/* Column headers */}
            {columnCategories.map((category) => (
              <th
                key={category.title}
                className="bg-primary/20 border-2 border-primary rounded p-2"
              >
                <CategoryHeader category={category} orientation="horizontal"/>
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {rowCategories.map((rowCategory, rowIndex) => (
            <tr key={rowCategory.title}>
              {/* Row header */}
              <th className="bg-accent/20 border-2 border-accent rounded p-2">
                <CategoryHeader category={rowCategory} orientation="vertical"/>
              </th>
              {/* Grid sections - each row has fewer cells (triangular) */}
              {columnCategories.slice(0, columnCategories.length - rowIndex).map((colCategory) => (
                <td
                  key={`${rowCategory.title}-${colCategory.title}`}
                  className="bg-muted/20 border-2 border-muted rounded"
                >
                  <SubGrid rowCategory={rowCategory} colCategory={colCategory}/>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
