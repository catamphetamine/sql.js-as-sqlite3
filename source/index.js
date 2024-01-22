import Database, { configure } from './Database.js'

export { default as Database, configure } from './Database.js'

// https://github.com/TryGhost/node-sqlite3/wiki/API#sqlite3verbose
// "Sets the execution mode to verbose to produce long stack traces.
//  There is no way to reset this. See the wiki page on debugging for more information".
export function verbose() {
	const VerboseLib = {
		Database,
		verbose() {
			return VerboseLib
		}
	}
	return VerboseLib
}

export default {
	Database,
	verbose,
	configure
}