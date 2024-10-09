export default function Dashboard() {
  // TODO: style page layout
  // TODO: pass game log data to page
  return (
    <>
      <section className="gameLogOverview">
        <h2 className="text-4xl">Your 2025 Game Log</h2>
        <div className="logHeaders">
          <h4>Title</h4>
          <h4>Goal</h4>
          <h4>Status</h4>
        </div>
      </section>
      <section className="gameLogStats">
        <h2 className="text-4xl">Game Log Statistics</h2>
      </section>
    </>
  )
}