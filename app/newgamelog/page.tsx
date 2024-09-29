import Search from "@/app/components/search";

export default function NewGameLog() {
  return (
    <div className="h-full">
      <section className="selectedgames m-8">
        <h2 className="text-2xl">Annual Game Log - Draft</h2>
      </section>
      <section className="searchgames m-8 h-full">
        <Search />
        <div className="p-20 flex justify-center">
          Use the search box to find and add games to your log.
        </div>
      </section>
    </div>
  )
}