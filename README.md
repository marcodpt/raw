# Raw
javascript es6 module that brings raw html to hyperscript or vdom

This module is useful when dealing with template engines and raw html pages that already exists!

## Usage example with superfine
```js
import { h, text, patch } from "https://unpkg.com/superfine"
import {raw} from 'https://cdn.jsdelivr.net/gh/marcodpt/raw/index.js'

const tpl = (state) => `
  <h1>This is my counter!</h1>
  <p>The current count is: ${state}</p>
`

const html = raw(h, text)

const setState = (state) =>
  patch(
    document.getElementById("app"),
    h("main", {}, 
      html(tpl(state)).concat([
        h("button", { onclick: () => setState(state - 1) }, text("-")),
        h("button", { onclick: () => setState(state + 1) }, text("+")),
      ])
    )
  )

setState(0)
```

Similar will be with [hyperapp](https://github.com/jorgebucaran/hyperapp).

Using it with original [hyperscript](https://github.com/hyperhype/hyperscript) just use

```js
const html = raw(h)
```

without `text` param

You can use any vdom or hyperscript like library and it will work to bring HTML strings to DOM
