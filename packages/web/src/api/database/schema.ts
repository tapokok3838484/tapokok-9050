import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const wallMessages = sqliteTable("wall_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  author: text("author").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const visitors = sqliteTable("visitors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  count: integer("count").notNull().default(0),
});
