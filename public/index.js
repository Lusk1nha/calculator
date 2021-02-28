const allKeys = document.querySelectorAll(".key")
const output = document.querySelector('#output')

const resultOutput = output.childNodes[1]
const previousOutput = output.childNodes[3]

let account = ''
let primaryAccount = ''
let operatorAccount = ''
let secondaryAccount = ''

let operatorActive = false


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

  if ( !operatorActive ) {
    primaryAccount += number
    
  } else {
    secondaryAccount += number

  }


  function numberValidations() {
    if ( !operatorActive && primaryAccount.length > 6 ) { return true}
    else if ( secondaryAccount.length > 6 ) { return true}

  }

}
 
function pressedOperator() {
  let operator = this.innerHTML
  
  if ( operatorValidations() ) return
  
  operatorActive = true
  operatorAccount = operator
  return account += operator

  
  function operatorValidations() {
    if ( !primaryAccount ) { return true } // IF the input doesn't have any number, return an error
    
    resultOutput.value += operator
    
    // operator transformation
    if ( operator === "x" ) operator = '*'
    else if ( operator === '÷' ) operator = '/'

    return
  } 
}

function pressedEnter() {
  if ( !primaryAccount || !secondaryAccount ) return

  const result = eval(account)
  
  previousOutput.innerHTML = resultOutput.value
  resultOutput.value = result

  account = result

  console.log(primaryAccount)
  console.log(operatorAccount)
  console.log(secondaryAccount)

  primaryAccount = result
  operatorAccount = ''
  secondaryAccount = ''

}

function pressedDelete() {
  account = ''
  resultOutput.value = ''
  previousOutput.innerHTML = ''

  primaryAccount = ''
  operatorAccount = ''
  secondaryAccount = ''

  operatorActive = false

}