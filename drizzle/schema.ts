import { pgTable, unique, uuid, varchar, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userName: varchar("user_name", { length: 55 }).notNull(),
	lastname: varchar({ length: 55 }),
	email: varchar({ length: 100 }).notNull(),
	password: text().notNull(),
	salt: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const url = pgTable("url", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	url: varchar({ length: 155 }).notNull(),
	code: varchar({ length: 155 }),
	userId: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "url_userId_users_id_fk"
		}),
]);
