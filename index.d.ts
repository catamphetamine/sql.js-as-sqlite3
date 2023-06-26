// https://github.com/TryGhost/node-sqlite3/blob/master/lib/sqlite3.d.ts
import { Database as DatabaseClass } from 'sqlite3';

export class Database extends DatabaseClass {}

export function verbose(): Library;

export interface Library {
	Database: typeof Database;
	verbose(): this;
}