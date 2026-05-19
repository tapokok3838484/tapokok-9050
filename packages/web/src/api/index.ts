import { Hono } from 'hono';
import { cors } from "hono/cors";
import { db } from "./database";
import { wallMessages, visitors } from "./database/schema";
import { desc } from "drizzle-orm";

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))

  // Wall messages
  .get('/wall', async (c) => {
    const messages = await db.select().from(wallMessages).orderBy(desc(wallMessages.createdAt));
    return c.json({ messages }, 200);
  })
  .post('/wall', async (c) => {
    const body = await c.req.json();
    const { author, message } = body;
    if (!author?.trim() || !message?.trim()) {
      return c.json({ error: 'Author and message are required' }, 400);
    }
    if (message.length > 300) {
      return c.json({ error: 'Message too long' }, 400);
    }
    const [created] = await db.insert(wallMessages).values({
      author: author.trim().slice(0, 50),
      message: message.trim().slice(0, 300),
    }).returning();
    return c.json({ message: created }, 201);
  })

  // Visitor counter
  .get('/visitors', async (c) => {
    let [row] = await db.select().from(visitors);
    if (!row) {
      [row] = await db.insert(visitors).values({ count: 1 }).returning();
    }
    return c.json({ count: row.count }, 200);
  })
  .post('/visitors/increment', async (c) => {
    let [row] = await db.select().from(visitors);
    if (!row) {
      [row] = await db.insert(visitors).values({ count: 1 }).returning();
    } else {
      [row] = await db.update(visitors).set({ count: row.count + 1 }).returning();
    }
    return c.json({ count: row.count }, 200);
  });

export type AppType = typeof app;
export default app;
