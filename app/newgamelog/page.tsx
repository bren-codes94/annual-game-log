'use client'

import Search from "@/app/components/search";
import { searchGames } from "@/data/igdb";
import { useState } from "react";

interface IGDBGame {
  id: number;
  name: string;
  genres: any;
}

export default function NewGameLog() {

  const [searchResults, setSearchResults] = useState([]);

  async function handleChange(searchValue: string) {
    let games = await searchGames(searchValue);
    setSearchResults(games)
  }

  return (
    <div className="h-full">
      <section className="selectedgames m-8">
        <h2 className="text-2xl">Annual Game Log - Draft</h2>
      </section>
      <section className="searchgames m-8 h-full">
        <Search onChange={handleChange} />
        <ul>
          {searchResults.map((game: IGDBGame) => {
            return (
              <li key={game.id}>{game.name}</li>
            )
          })}
        </ul>
        { searchResults.length === 0 &&
          (
            <div className="p-20 flex justify-center">
              Use the search box to find and add games to your log.
            </div>
          )
        }
      </section>
    </div>
  )
}