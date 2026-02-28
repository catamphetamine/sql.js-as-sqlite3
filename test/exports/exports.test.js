import { describe, it } from 'mocha'
import { expect } from 'chai'

import Library, { Database, verbose } from '../../index.js'

import LibraryCJS from '../../index.cjs'

describe('exports', () => {
	it('should export ES6', () => {
		expect(Library).to.be.a('object')
		expect(Database).to.be.a('function')
		expect(verbose).to.be.a('function')
	})

	it('should export CommonJS', () => {
		expect(LibraryCJS).to.be.a('object')
		expect(LibraryCJS.Database).to.be.a('function')
		expect(LibraryCJS.verbose).to.be.a('function')
	})
})