const countries = [
  { country: "Deutschland", capital: "Berlin" },
  { country: "Frankreich", capital: "Paris" },
  { country: "Spanien", capital: "Madrid" },
  { country: "Italien", capital: "Rom" },
  // ... Liste weiterführen für alle Länder der Welt
];

let index = 0;
let correct = 0;
let wrongAnswers = [];

const questionEl = document.getElementById('question');
const form = document.getElementById('answer-form');
const input = document.getElementById('answer-input');
const feedbackEl = document.getElementById('feedback');
const summaryEl = document.getElementById('summary');
const scoreEl = document.getElementById('score');
const percentEl = document.getElementById('percent');
const wrongListEl = document.getElementById('wrong-list');
const restartBtn = document.getElementById('restart');

function showQuestion() {
  const q = countries[index];
  questionEl.textContent = `Was ist die Hauptstadt von ${q.country}?`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const answer = input.value.trim();
  const correctCapital = countries[index].capital;

  if (answer.toLowerCase() === correctCapital.toLowerCase()) {
    feedbackEl.textContent = 'Richtig!';
    correct++;
  } else {
    feedbackEl.textContent = `Falsch. Richtig wäre ${correctCapital}.`;
    wrongAnswers.push({ country: countries[index].country, your: answer, correct: correctCapital });
  }

  input.value = '';
  index++;

  if (index < countries.length) {
    setTimeout(() => {
      feedbackEl.textContent = '';
      showQuestion();
    }, 1000);
  } else {
    setTimeout(showSummary, 1000);
  }
});

function showSummary() {
  document.getElementById('quiz').classList.add('hidden');
  summaryEl.classList.remove('hidden');

  scoreEl.textContent = `Richtig: ${correct}, Falsch: ${countries.length - correct}`;
  const pct = ((correct / countries.length) * 100).toFixed(1);
  percentEl.textContent = `Trefferquote: ${pct}%`;

  wrongAnswers.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.country}: Deine Antwort "${entry.your}" – richtig: "${entry.correct}"`;
    wrongListEl.appendChild(li);
  });
}

restartBtn.addEventListener('click', () => location.reload());

// Kickoff
showQuestion();