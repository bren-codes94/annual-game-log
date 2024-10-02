'use client'

import Search from "@/app/components/search";
import { searchGames } from "@/data/igdb";
import { useState } from "react";

// TODO: when a new value is emitted from Search component, query IGDB API for list of games
interface IGDBGames {
  id: number;
  name: string;
  genres: any;
}

export default function NewGameLog() {
  // let data = await searchGames('halo');
  // let games: IGDBGames[] = await data.json();

  const [searchText, setSearchText] = useState("");

  function handleChange(e: any) {
    setSearchText(e.target.value);
  }
  return (
    <div className="h-full">
      <section className="selectedgames m-8">
        <h2 className="text-2xl">Annual Game Log - Draft</h2>
      </section>
      <section className="searchgames m-8 h-full">
        <Search onChange={handleChange} />
        {searchText}
        <div className="p-20 flex justify-center">
          Use the search box to find and add games to your log.
        </div>
      </section>
    </div>
  )
}