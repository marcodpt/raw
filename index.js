export const raw = function (h, text) {
  return function (html) {
    var e = html
    if (typeof html == 'string') {
      var e = document.createElement('div')
      e.innerHTML = html.trim()
    }

    const parse = function (el) {
      if (el.nodeType == 3) {
        return text == null ? h(el.textContent) : text(el.textContent)
      } else {
        const A = el.attributes
        var attrs = {}
        for (var i = 0; i < A.length; i++){
          attrs[A[i].nodeName] = A[i].nodeValue
        }

        const C = el.childNodes
        var children = []
        for (var i = 0; i < C.length; i++) {
          children.push(parse(C[i]))
        }

        return h(el.tagName.toLowerCase(), attrs, children)
      }
    }

    const result = parse(e)

    return typeof html != 'string' ? result :
      (result.children.length == 1 ? result.children[0] : result.children)
  }
}
