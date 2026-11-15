CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`checksum` text NOT NULL,
	`kind` text NOT NULL,
	`storage_key` text NOT NULL,
	`uploaded` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`notes` text NOT NULL,
	`status` text DEFAULT 'uploading' NOT NULL,
	`created_at` text NOT NULL,
	`received_at` text,
	`transcript` text,
	`draft` text,
	`processing_error` text
);
