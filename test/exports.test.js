import Library, { Database, verbose } from '../index.js'

import LibraryCJS from '../index.cjs'

describe('exports', () => {
	it('should export ES6', () => {
		Library.should.be.a('object')
		Database.should.be.a('function')
		verbose.should.be.a('function')
	})

	it('should export CommonJS', () => {
		LibraryCJS.should.be.a('object')
		LibraryCJS.Database.should.be.a('function')
		LibraryCJS.verbose.should.be.a('function')
	})
})