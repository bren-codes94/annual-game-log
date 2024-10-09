import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="text-4xl">Annual Game Log 2025</h2>
        <div>
          <Link href="/newgamelog">Start new game log</Link>
          
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          Created by IReloaded Games
      </footer>
    </div>
  );
}
