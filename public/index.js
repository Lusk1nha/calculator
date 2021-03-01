const allKeys = document.querySelectorAll(".key")
const output = document.querySelector('#output')

const resultOutput = document.querySelector('.result')
const previousOutput = document.querySelector('.previous-account')

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
  const number = this.innerHTML

  if (numberValidations(number)) return
  
  resultOutput.value += number
  account += number

  function numberValidations(number) {
    if ( primaryAccount == '' && number == 0 || primaryAccount == '' && number == '.' ) return true

    if ( !operatorActive && primaryAccount.length > 6 ) return true
    else if ( secondaryAccount.length > 6 ) return true

    if ( !operatorActive ) {
      primaryAccount += number 
      return false
    } 
    
    secondaryAccount += number
    return false
  }
}
 
function pressedOperator() {
  let operator = this.innerHTML
  
  if ( operatorValidations() ) return
  
  operatorActive = true
  operatorAccount = operator
  return account += operator

  
  function operatorValidations() {
    if ( !primaryAccount ) return true // IF the input doesn't have any number, return an error
    if ( operatorAccount ) return true

    resultOutput.value += operator
    
    // operator transformation
    if ( operator === "x" ) operator = '*'
    else if ( operator === '÷' ) operator = '/'
  }
}

function pressedEnter() {
  if ( !primaryAccount || !secondaryAccount ) return

  const result = eval(account)

  previousOutput.innerHTML = resultOutput.value
  resultOutput.value = result

  account = result

  primaryAccount = result
  operatorAccount = ''
  secondaryAccount = ''

}

function pressedDelete() {
  if ( this.innerHTML === "AC" ) {
    const stringResult = resultOutput.value.toString()
    const stringAccount = account.toString()

    if ( operatorActive && secondaryAccount == '' ) {
      operatorActive = false
      operatorAccount = ''
    }

    resultOutput.value = stringResult.slice(0, -1)
    account = stringAccount.slice(0, -1)
    return

  } else {
    account = ''
    resultOutput.value = ''
    previousOutput.innerHTML = ''

    primaryAccount = ''
    operatorAccount = ''
    secondaryAccount = ''

    return operatorActive = false
  }
}