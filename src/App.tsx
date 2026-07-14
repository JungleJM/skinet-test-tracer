import './App.css'
import boardFixtureJson from './fixtures/board.json?raw'

type BoardFixture = {
  project: {
    id: string
    title: string
  }
  columns: Array<{
    id: string
    title: string
    cards: Array<{
      id: string
      title: string
      description?: string
      assignee?: string
      dueDate?: string
    }>
  }>
}

const boardFixture = JSON.parse(boardFixtureJson) as BoardFixture

function formatDueDate(dueDate: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${dueDate}T00:00:00Z`))
}

function App() {
  return (
    <main className="app-shell" aria-labelledby="project-title">
      <section className="board-header">
        <p className="eyebrow">Fixture board</p>
        <h1 id="project-title">{boardFixture.project.title}</h1>
        <p>
          Read-only cards from checked-in fixture data. No credentials or live
          service are required.
        </p>
      </section>

      <section className="board" aria-label="Kanban board">
        {boardFixture.columns.map((column) => (
          <article className="board-column" key={column.id}>
            <header className="column-header">
              <h2>{column.title}</h2>
              <span aria-label={`${column.cards.length} cards`}>
                {column.cards.length}
              </span>
            </header>

            <div className="card-list">
              {column.cards.map((card) => (
                <article className="task-card" key={card.id}>
                  <h3>{card.title}</h3>
                  {card.description ? <p>{card.description}</p> : null}
                  {card.assignee || card.dueDate ? (
                    <dl className="card-meta">
                      {card.assignee ? (
                        <div>
                          <dt>Assignee</dt>
                          <dd>{card.assignee}</dd>
                        </div>
                      ) : null}
                      {card.dueDate ? (
                        <div>
                          <dt>Due</dt>
                          <dd>{formatDueDate(card.dueDate)}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}
                </article>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="baseline-marker" aria-label="Baseline smoke marker">
        <span>SkiNet practice app</span>
        <h2>Baseline is ready</h2>
      </section>
    </main>
  )
}

export default App
