import { defineRelationsPart } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { user } from './auth';

export const todos = pgTable(
  'todos',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    completed: boolean('completed').default(false).notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('todos_userId_idx').on(table.userId)],
);

export const todoRelations = defineRelationsPart({ todos, user }, (r) => ({
  todos: {
    user: r.one.user({
      from: r.todos.userId,
      to: r.user.id,
    }),
  },
}));

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
