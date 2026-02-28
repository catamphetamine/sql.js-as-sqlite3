# `sql.js-as-sqlite3`

A wrapper around [`sql.js`](https://www.npmjs.com/package/sql.js) (a web-browser version of SQLite) that exposes the same API interface as [`sqlite3`](https://www.npmjs.com/package/sqlite3) connected to a normal SQLite database.

[Demo](https://catamphetamine.gitlab.io/sql.js-as-sqlite3/)

## Why?

[`sequelize`](https://www.npmjs.com/package/sequelize) is an ORM that supports many databases, including SQLite, which is written in C++. Specifically, `sequelize` uses [`sqlite3`](https://www.npmjs.com/package/sqlite3) package to "talk" to SQLite. Both SQLite and `sqlite3` package were written in C++ and weren't originally designed to work in a web browser.

Then appeared an unofficial port of SQLite to WASM (web-browser-compatible code) called [`sql.js`](npmjs.com/package/sql.js). Because `sqlite3` is not designed to work in a web browser, it won't support this `sql.js` web-browser-compatible port. And because `sequelize` relies exclusively on `sqlite3` when working with SQLite, it won't support `sql.js` either.

But there's a loophole in `sequelize` — specifically, a `dialectModule` parameter — that allows swapping the `sqlite3` module with any arbitrary one so long as it keeps the same "interface".

So the workaround is to create a wrapper around `sql.js` so that for `sequelize` it becomes indistinguishable from `sqlite3`, effectively tricking `sequelize` into thinking that it still works with SQLite over `sqlite3` in Node.js instead of actually working with `sql.js` in a web browser.

And this is all that `sql.js-as-sqlite3` package does.

## Install

```js
npm install sql.js sql.js-as-sqlite3 --save
```

If you're not using a "bundler" then use a [standalone version from a CDN](#browser-no-bundler).

## Use

### Node.js

```js
import sqlite3 from 'sql.js-as-sqlite3'

// Use it as if it was `sqlite3`
const db = new sqlite3.Database(':memory:')
```

### Browser (with bundler)

```js
import sqlJsAsSqlite3 from 'sql.js-as-sqlite3'
import initSqlJs from 'sql.js'

sqlJsAsSqlite3.configure({
  // `sql.js` package default export.
  initSqlJs,
  // Base URL for `sql.js` to get the `*.wasm` files like `sql-wasm-debug.wasm`.
  // The version of the `*.wasm` files must match the version of the `sql.js` package.
  // Must end with a "/".
  wasmFileBaseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/'
})

// Use it as if it was `sqlite3`
const db = new sqlite3.Database(':memory:')
```

### Browser (no bundler)

When not using a "bundler", one can import the package in a web browser by including it from a CDN such as [unpkg.com](https://unpkg.com) or [jsdelivr.com](https://jsdelivr.com)

```html
<script src="https://unpkg.com/sql.js-as-sqlite3@0.2.x/bundle/sql.js-as-sqlite3.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js"></script>
<script>
  // Base URL for `sql.js` to get the `*.wasm` files like `sql-wasm-debug.wasm`.
  // The version of the `*.wasm` files must match the version of `sql.js`.
  // Must end with a "/".
  SQL_JS_WASM_FILE_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/'
</script>

<script>
  // Use it as if it was `sqlite3`
  const db = new sqlJsAsSqlite3.Database(':memory:')
</script>
```

## Sequelize

This package could be used to make [`sequelize`](https://www.npmjs.com/package/sequelize) ORM work with `sql.js` (a port of SQLite database that works in a web browser):

```js
import Sequelize from 'sequelize'
import sqlite3 from 'sql.js-as-sqlite3'

const sequelize = new Sequelize('sqlite://:memory:', {
  dialectModule: sqlite3
})
```

For a server-side example, see a [test](https://gitlab.com/catamphetamine/sql.js-as-sqlite3/-/blob/main/test/sequelize.test.js).

For a client-side example, see [`sequelize-browser`](https://www.npmjs.com/package/sequelize-browser) package.

<!--
See `./test/sequelize.js`.
-->

## Notes

In April 2023, SQLite released an official WASM-compatible [npm package](https://www.npmjs.com/package/@sqlite.org/sqlite-wasm) intended to be used in a web browser. It could be viewed as an "official" alternative to `sql.js` which was itself released in late 2016 and is still maintained as of early 2026. Which one is "better" for web-browser use? I personally don't really bother to care. I guess `sql.js` author could come up with a benchmark or a readme comparison section.

## References

Based on the [code by @domasx2](https://github.com/sql-js/sql.js/issues/91#issuecomment-169655900).

## GitHub

On March 9th, 2020, GitHub, Inc. silently [banned](https://medium.com/@catamphetamine/how-github-blocked-me-and-all-my-libraries-c32c61f061d3) my account (erasing all my repos, issues and comments, even in my employer's private repos) without any notice or explanation. Because of that, all source codes had to be promptly moved to GitLab. The [GitHub repo](https://github.com/catamphetamine/sql.js-as-sqlite3) is now only used as a backup (you can star the repo there too), and the primary repo is now the [GitLab one](https://gitlab.com/catamphetamine/sql.js-as-sqlite3). Issues can be reported in any repo.

## License

[MIT](LICENSE)
