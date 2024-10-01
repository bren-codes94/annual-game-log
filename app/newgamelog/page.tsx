import Search from "@/app/components/search";
import { searchGames } from "@/data/igdb";

// TODO: when a new value is emitted from Search component, query IGDB API for list of games

export default async function NewGameLog() {
  let data = await searchGames('halo');
  let games = await data.json();
  return (
    <div className="h-full">
      <section className="selectedgames m-8">
        <h2 className="text-2xl">Annual Game Log - Draft</h2>
      </section>
      <section className="searchgames m-8 h-full">
        <Search />
        <div className="p-20 flex justify-center">
          Halo Games:
          <ul>
            {games.map((game: any) => {
              return(
                <li key={game.id}>
                  {game.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="p-20 flex justify-center">
          Use the search box to find and add games to your log.
        </div>
      </section>
    </div>
  )
}