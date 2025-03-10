const tiles = document.querySelector('.title-container')
const backspaceAndEnterRow = document.querySelector('#backspaceAndEnterRow')
const keyboardFirstRow = document.querySelector('#keyboardFirstRow')
const keyboardSecondRow = document.querySelector('#keyboardSecondRow')
const keyboardThirdRow = document.querySelector('#keyboardThirdRow')

const keysFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const keysSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const keysThirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

const rows = 6
const columns = 5
let currentRow = 0
let currentColumn = 0
//const letreco = 'VASCO'
var things = ['sagaz','negro','exito','mexer','termo','senso','nobre','algoz','afeto','plena','etica','mutua','tenue','sutil','vigor','aquem','fazer','porem','audaz','sanar','seçao','assim','inato','cerne','ideia','fosse','desde','poder','moral','torpe','muito','honra','justo','futil','gozar','anexo','razao','etnia','quiça','sobre','icone','sonho','tange','lapso','mutuo','expor','haver','amigo','habil','casal','tempo','porra','seara','pesar','avido','entao','posse','dengo','boçal','genro','coser','ardil','corja','causa','prole','paria','dizer','detem','tenaz','dever','digno','saber','crivo','graça','apice','ansia','animo','brado','ceder','orgia','comum','sendo','temor','assaz','culto','atroz','mundo','pauta','censo','fugaz','ainda','cozer','denso','valha','nenem','vicio','forte','estar','vulgo','reves','pudor','regra','dogma','louco','criar']
const letreco1 = things[Math.floor(Math.random()*things.length)];
let letreco = letreco1.toString()
let letrecoMap = {}
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index
}
const guesses = []

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns)
  const tileRow = document.createElement('div')
  tileRow.setAttribute('id', 'row' + rowIndex)
  tileRow.setAttribute('class', 'tile-row')
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement('div')
    tileColumn.setAttribute('id', 'row' + rowIndex + 'column' + columnIndex)
    tileColumn.setAttribute(
      'class',
      rowIndex === 0 ? 'tile-column typing' : 'tile-column disabled'
    )
    tileRow.append(tileColumn)
    guesses[rowIndex][columnIndex] = ''
  }
  tiles.append(tileRow)
}

const checkGuess = () => {
  const guess = guesses[currentRow].join('')
  if (guess.length !== columns) {
    return
  }

  var currentColumns = document.querySelectorAll('.typing')
  for (let index = 0; index < columns; index++) {
    const letter = guess[index]
    if (letrecoMap[letter] === undefined) {
      currentColumns[index].classList.add('wrong')
    } else {
      if (letrecoMap[letter] === index) {
        currentColumns[index].classList.add('right')
      } else {
        currentColumns[index].classList.add('displaced')
      }
    }
  }

  if (guess === letreco) {
    window.alert('Parabéns, achou :)')
    return
  }
  {
    if (currentRow === rows - 1) {
      window.alert(`Errou, a palavra era: ${letreco}`)
    } else {
      moveToNextRow()
    }
  }
}

const moveToNextRow = () => {
  var typingColumns = document.querySelectorAll('.typing')
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove('typing')
    typingColumns[index].classList.add('disabled')
  }
  currentRow++
  currentColumn = 0

  const currentRowEl = document.querySelector('#row' + currentRow)
  var currentColumns = currentRowEl.querySelectorAll('.tile-column')
  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove('disabled')
    currentColumns[index].classList.add('typing')
  }
}

const handleKeyboardOnClick = key => {
  if (currentColumn === columns) {
    return
  }

  const currentTile = document.querySelector(
    '#row' + currentRow + 'column' + currentColumn
  )
  currentTile.textContent = key
  guesses[currentRow][currentColumn] = key
  currentColumn++
}

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach(key => {
    var buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleKeyboardOnClick(key))
    keyboardRow.append(buttonElement)
  })
}

createKeyboardRow(keysFirstRow, keyboardFirstRow)
createKeyboardRow(keysSecondRow, keyboardSecondRow)
createKeyboardRow(keysThirdRow, keyboardThirdRow)

const handleBackspace = () => {
  if (currentColumn === 0) {
    return
  }

  currentColumn--
  guesses[currentRow][currentColumn] = ''
  const tile = document.querySelector(
    '#row' + currentRow + 'column' + currentColumn
  )
  tile.textContent = ''
}
const backspaceButton = document.createElement('button')
backspaceButton.addEventListener('click', handleBackspace)
backspaceButton.textContent = '<'
backspaceAndEnterRow.append(backspaceButton)

const enterButton = document.createElement('button')
enterButton.addEventListener('click', checkGuess)
enterButton.textContent = 'ENTER'
backspaceAndEnterRow.append(enterButton)

document.onkeydown = function (evt) {
  evt = evt || window.evt
  if (evt.key === 'Enter') {
    checkGuess()
  } else if (evt.key === 'Backspace') {
    handleBackspace()
  } else {
    handleKeyboardOnClick(evt.key.toUpperCase())
  }
}
