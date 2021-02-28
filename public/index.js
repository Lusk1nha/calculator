const allKeys = document.querySelectorAll(".key")
const output = document.querySelector('#output')

const resultOutput = output.childNodes[1]
const previousOutput = output.childNodes[3]

let account = ''

for ( key of allKeys ) {
  const keyType = key.classList[1]

  if (keyType == 'number') {
    key.addEventListener('click', pressedNumber)

  } else if ( keyType == 'operator') {
    key.addEventListener('click', pressedOperator)

  } else if ( keyType == 'enter') {
    key.addEventListener('click', pressedEnter)

  } else if ( keyType == 'delete' ) {
    key.addEventListener('click', pressedDelete)

  }

}

function pressedNumber() {
  if (numberValidations()) return console.log('limit account') 

  const number = this.innerHTML
  resultOutput.value += number
  account += number

  function numberValidations() {
    if ( resultOutput.value.length > 8 ) { return true}

  }

}
 
function pressedOperator() {
  let operator = this.innerHTML
  resultOutput.value += operator
  
  if ( operatorValidations() ) return console.log('error')
  
  account += operator
  
  function operatorValidations() {
    if ( !resultOutput.value ) { return true } // IF the input doesn't have any number, return an error

    // operator transformation
    if ( operator === "x" )operator = '*'
    else if ( operator === '÷' ) operator = '/'

    return
  }
  
}

function pressedEnter() {
  const result = eval(account)
  
  previousOutput.innerHTML = resultOutput.value
  resultOutput.value = result

  account = result

}

function pressedDelete() {
  account = ''
  resultOutput.value = ''
  previousOutput.innerHTML = ''

}