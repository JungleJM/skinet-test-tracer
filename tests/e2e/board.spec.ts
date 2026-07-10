import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'

const fixture = JSON.parse(
  readFileSync(new URL('../../src/fixtures/board.json', import.meta.url), 'utf8'),
) as {
  project: { title: string }
  columns: Array<{
    title: string
    cards: Array<{
      title: string
      assignee?: string
      dueDate?: string
    }>
  }>
}

function formattedDueDate(dueDate: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${dueDate}T00:00:00Z`))
}

test('renders the fixture board with expected columns and cards', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: fixture.project.title }),
  ).toBeVisible()

  for (const column of fixture.columns) {
    await expect(page.getByRole('heading', { name: column.title })).toBeVisible()
  }

  const todo = fixture.columns[0]
  const todoColumn = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: todo.title }) })

  expect(todo.cards.length).toBeGreaterThanOrEqual(2)

  for (const card of todo.cards) {
    await expect(
      todoColumn.getByRole('heading', { name: card.title }),
    ).toBeVisible()
    if (card.assignee) {
      await expect(todoColumn.getByText(card.assignee)).toBeVisible()
    }
    if (card.dueDate) {
      await expect(todoColumn.getByText(formattedDueDate(card.dueDate))).toBeVisible()
    }
  }
})

test('does not request Vikunja or API paths while rendering', async ({
  page,
}) => {
  const forbiddenRequests: string[] = []

  page.on('request', (request) => {
    const url = new URL(request.url())
    const hostname = url.hostname.toLowerCase()

    if (hostname.includes('vikunja') || url.pathname.startsWith('/api/')) {
      forbiddenRequests.push(request.url())
    }
  })

  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: fixture.project.title }),
  ).toBeVisible()

  await page.waitForTimeout(1200)
  expect(forbiddenRequests).toEqual([])
})

test('keeps columns reachable at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const board = page.getByLabel('Kanban board')
  await expect(board).toBeVisible()

  const scrollMeasurements = await board.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }))

  expect(scrollMeasurements.scrollWidth).toBeGreaterThan(
    scrollMeasurements.clientWidth,
  )
  await expect(page.getByRole('heading', { name: 'To do' })).toBeVisible()

  await board.evaluate((element) => {
    element.scrollLeft = element.scrollWidth
  })

  const boardBox = await board.boundingBox()
  const doneColumn = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: fixture.columns[2].title }) })
  const doneBox = await doneColumn.boundingBox()

  expect(boardBox).not.toBeNull()
  expect(doneBox).not.toBeNull()
  expect(doneBox!.x).toBeGreaterThanOrEqual(boardBox!.x)
  expect(doneBox!.x + doneBox!.width).toBeLessThanOrEqual(
    boardBox!.x + boardBox!.width,
  )
  await expect(
    doneColumn.getByRole('heading', { name: fixture.columns[2].title }),
  ).toBeVisible()
})

test('keeps desktop columns separated without horizontal overlap', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')

  const columns = await page.locator('.board-column').evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect()
      return {
        left: box.left,
        right: box.right,
        width: box.width,
      }
    }),
  )

  expect(columns).toHaveLength(3)
  for (let index = 0; index < columns.length - 1; index += 1) {
    expect(columns[index].width).toBeGreaterThan(250)
    expect(columns[index].right).toBeLessThanOrEqual(columns[index + 1].left)
  }
})
