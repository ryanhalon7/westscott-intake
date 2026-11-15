import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey(), ownerId: text('owner_id').notNull(), notes: text('notes').notNull(),
  status: text('status').notNull().default('uploading'), createdAt: text('created_at').notNull(),
  receivedAt: text('received_at'), transcript: text('transcript'), draft: text('draft'), processingError: text('processing_error'),
});
export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(), submissionId: text('submission_id').notNull().references(() => submissions.id),
  name: text('name').notNull(), type: text('type').notNull(), size: integer('size').notNull(),
  checksum: text('checksum').notNull(), kind: text('kind').notNull(), storageKey: text('storage_key').notNull(),
  uploaded: integer('uploaded').notNull().default(0),
});
