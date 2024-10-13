import Map from "./map"

import { getPositions } from "@/lib/positions.ts";

export default function Home() {

  const positions = getPositions();

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hello from my Raspberry Pi</h1>
        <Map />
      </main>
  );
}
