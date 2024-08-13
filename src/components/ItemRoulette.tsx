'use client';

import { Button, Divider, LoadingOverlay } from '@mantine/core';
import { useState } from 'react';

type Props = {
  items: string[];
};

export const ItemRoulette = ({ items }: Props) => {
  const [waiting, setWaiting] = useState(false);
  const [dice, setDice] = useState<number | null>(null);
  const [count, setCount] = useState<number[]>([]);

  const handleStart = async () => {
    if (waiting) return;
    setDice(null);
    setWaiting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const dice = Math.floor(Math.random() * items.length);
    setDice(dice);
    setCount((prev) => [...prev, dice]);
    setWaiting(false);
  };
  const handleReset = () => {
    setDice(null);
    setCount([]);
  };

  return (
    <>
      <div className="space-y-6 w-full">
        <div className="border border-dashed border-slate-300 w-fit mx-auto min-w-52 relative rounded-lg px-4 h-[54px]">
          <div className="font-bold animate-bounce text-xl text-center pt-4 pb-2">
            {dice != null && <div>{items[dice]}</div>}
          </div>
          <span className="absolute -top-3 left-2 text-sm bg-white px-1">
            Result
          </span>
        </div>

        <Divider />

        <div className="px-6 space-y-2">
          {items.map((item, i) => (
            <div key={item} className="flex items-center gap-x-3">
              <span className="font-bold">{item}</span>
              {count
                .filter((c) => c === i)
                .map((_, i) => (
                  <div key={i} className="size-3 rounded-full bg-blue-600" />
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 w-full flex gap-x-2">
        <Button className="flex-grow" onClick={handleStart}>
          Start
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <LoadingOverlay visible={waiting} />
    </>
  );
};
