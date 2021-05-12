import {raw} from 'https://cdn.jsdelivr.net/gh/marcodpt/raw/index.js'

const str = function (X) {
  return JSON.stringify(X, undefined, 2)
}
const h = function (tagName, attributes, children) {
  return {
    tag: tagName,
    attrs: attributes || {},
    children: children instanceof Array ? children :
      (children == null ? [] : [children])
  }
}
const text = function (str) {
  return str
}

const clean = function (html) {
  return html.replace(/>\s+</g, function(m) {
    return '><'
  })
}

const r = function (html) {
  return raw(h, text)(typeof html == 'string' ? clean(html) : html)
}

QUnit.test("strings", function (assert) {
  assert.equal(str(r('<a/>')), str({
    tag: 'a',
    attrs: {},
    children: []
  }))
  assert.equal(str(r('<a href="www.github.com">GitHub</a>')), str({
    tag: 'a',
    attrs: {
      href: "www.github.com"
    },
    children: [
      "GitHub"
    ]
  }))
  assert.equal(str(r(
    `<main class="page">
      <h1 class="header">Hello world!</h1>
      <p>Some awesome information</p>
    </main>`
  )), str({
    tag: 'main',
    attrs: {
      class: "page"
    },
    children: [
      {
        tag: 'h1',
        attrs: {
          class: "header"
        },
        children: ["Hello world!"]
      }, {
        tag: 'p',
        attrs: {},
        children: ["Some awesome information"]
      }
    ]
  }))
})

QUnit.test("dom", function (assert) {
  const div = document.createElement('div')
  const e = function (html) {
    div.innerHTML = clean(html)
    return div.firstChild
  }
  assert.equal(str(r(e('<a/>'))), str({
    tag: 'a',
    attrs: {},
    children: []
  }))
  assert.equal(str(r(e('<a href="www.github.com">GitHub</a>'))), str({
    tag: 'a',
    attrs: {
      href: "www.github.com"
    },
    children: [
      "GitHub"
    ]
  }))
  assert.equal(str(r(e(
    `<main class="page">
      <h1 class="header">Hello world!</h1>
      <p>Some awesome information</p>
    </main>`
  ))), str({
    tag: 'main',
    attrs: {
      class: "page"
    },
    children: [
      {
        tag: 'h1',
        attrs: {
          class: "header"
        },
        children: ["Hello world!"]
      }, {
        tag: 'p',
        attrs: {},
        children: ["Some awesome information"]
      }
    ]
  }))
})
