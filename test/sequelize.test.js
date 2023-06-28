import URL from 'node:url'

import Sequelize from 'sequelize'

import sqlJsAsSqlite3 from '../source/index.js'
// import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'

describe('sequelize', function() {
	it('should work with sequelize', async function() {
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
	})

	it('should work with sequelize (random operations)', async function() {
		const sequelize = new Sequelize('sqlite://:memory:', { dialectModule: sqlJsAsSqlite3 });

		const User = sequelize.define('user', {
			username: Sequelize.STRING,
			birthday: Sequelize.DATE
		})

		await sequelize.sync()

		// Create first user.

		let jane = await User.create({
			username: 'jane',
			birthday: Date.UTC(1980, 6, 1)
		})

		jane = jane.get({ plain: true })
		delete jane.createdAt
		delete jane.updatedAt

		jane.should.deep.equal({
			id: 1,
			username: 'jane',
			birthday: new Date('1980-07-01T00:00:00.000Z')
		})

		// Create second user.

		let john = await User.create({
			username: 'jack',
			birthday: Date.UTC(1980, 1, 1)
		})

		john.update({
			username: 'john',
			birthday: Date.UTC(1980, 0, 1)
		})

		john = john.get({ plain: true })
		delete john.createdAt
		delete john.updatedAt

		john.should.deep.equal({
			id: 2,
			username: 'john',
			birthday: new Date('1980-01-01T00:00:00.000Z')
		})

		// Get the list of users.

		let users = await User.findAll({
			where: {
				username: {
					[Sequelize.Op.ne]: 'alice'
				}
			}
		})

		users.length.should.equal(2)
		users[0].id.should.equal(jane.id)
		users[1].id.should.equal(john.id)

		// Delete the first user.
		await users[0].destroy()

		// Get the list of users.

		users = await User.findAll({
			where: {
				username: {
					[Sequelize.Op.ne]: 'alice'
				}
			}
		})

		users.length.should.equal(1)
		users[0].id.should.equal(john.id)

		// Get the user by username.

		const johnByUsername = await User.findOne({
			where: {
				username: 'john'
			}
		})

		johnByUsername.id.should.equal(john.id)

		// Clear the database.
		await User.truncate()
	})
})