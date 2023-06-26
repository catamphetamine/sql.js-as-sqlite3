import Sequelize from 'sequelize'
import sqlJsAsSqlite3 from '../source/index.js'
// import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'

describe('sequelize', function() {
	it('should work with sequelize', async function() {
		const sequelize = new Sequelize('sqlite://dbname', { dialectModule: sqlJsAsSqlite3 });

		const User = sequelize.define('user', {
			username: Sequelize.STRING,
			birthday: Sequelize.DATE
		})

		await sequelize.sync()

		let user = await User.create({
			username: 'janedoe',
			birthday: new Date(1980, 6, 20)
		})

		user = user.get({ plain: true })
		delete user.createdAt
		delete user.updatedAt

		user.should.deep.equal({
			id: 1,
			username: 'janedoe',
			birthday: new Date('1980-07-19T21:00:00.000Z')
		})
	})
})