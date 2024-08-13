import { AddItemButton } from '@/components/AddItemButton';
import { ItemRoulette } from '@/components/ItemRoulette';
import { getCookie } from '@/lib/cookie';

export default async function Home() {
  const itemsJson = await getCookie('items');
  const items = itemsJson ? JSON.parse(itemsJson) : [];

  return (
    <main className="flex w-full min-h-svh flex-col items-center justify-between">
      <div className="flex w-full justify-between items-center border-b px-4 py-2">
        <h1 className="text-lg font-bold">Roulette</h1>
        <AddItemButton items={items} />
      </div>

      <ItemRoulette items={items} />
    </main>
  );
}
