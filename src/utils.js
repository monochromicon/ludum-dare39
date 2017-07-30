import * as characters from './dialog.json'

export const centerGameObjects = objects => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const dialogue = function * (name) {
  const character = characters[name]
  let currentNode = 0

  let target = yield {
    line: character[currentNode].line,
    choices: character[currentNode].responses.map(v => v.quip)
  }

  while (true) {
    if (character[currentNode].responses[target].target < 0) return null
    currentNode = character[currentNode].responses[target].target
    target = yield {
      line: character[currentNode].line,
      choices: character[currentNode].responses.map(v => v.quip)
    }
  }
}
