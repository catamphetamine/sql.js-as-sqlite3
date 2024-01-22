import URL from 'node:url'

import Sequelize from 'sequelize'
import initSqlJs from 'sql.js'

import sqlJsAsSqlite3 from '../source/index.js'
// import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'

describe('sequelize', function() {
	it('should work with `config` static function', async function() {
		// Set configuration.
		sqlJsAsSqlite3.configure({
			initSqlJs,
			wasmFileBaseUrl: 'https://example.com/dist/'
		})

		const sequelize = new Sequelize('sqlite://:memory:', { dialectModule: sqlJsAsSqlite3 });

		const User = sequelize.define('user', {
			username: Sequelize.STRING,
			birthday: Sequelize.DATE
		})

		await sequelize.sync()

		// Create and fetch a record.

		let user = await User.create({
			username: 'jane',
			birthday: Date.UTC(1980, 6, 1)
		})

		user = user.get({ plain: true })
		delete user.createdAt
		delete user.updatedAt

		user.should.deep.equal({
			id: 1,
			username: 'jane',
			birthday: new Date('1980-07-01T00:00:00.000Z')
		})

		// Clear the database.
		await User.truncate()

		// Reset configuration.
		sqlJsAsSqlite3.configure({
			initSqlJs: undefined,
			wasmFileBaseUrl: undefined
		})
	})
})