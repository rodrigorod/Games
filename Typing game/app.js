const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const correct = true;
const timerElement = document.querySelector('#timer')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
      if (character === characterSpan.innerText) {
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
      } else if (character == null) {
          characterSpan.classList.remove('correct')
          characterSpan.classList.remove('incorrect')
          correct = false
      } else {
          characterSpan.classList.remove('correct')
          characterSpan.classList.add('incorrect')
          correct = false
      }
  })
    if (correct) renderNewQuote()
})


function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
   return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()