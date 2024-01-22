// https://github.com/TryGhost/node-sqlite3/blob/master/lib/sqlite3.d.ts
import { Database as DatabaseClass } from 'sqlite3';

interface Config {
	initSqlJs: any;
	wasmFileBaseUrl: string;
}

export class Database extends DatabaseClass {}

export function verbose(): Library;

export function configure(config: Config): void;

export interface Library {
	Database: typeof Database;
	verbose(): this;
	configure(config: Config): void;
}