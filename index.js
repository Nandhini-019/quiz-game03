const quizData = [
  {
    type: "single",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris"
  },
  {
    type: "multi",
    question: "Select all prime numbers:",
    options: ["2", "3", "4", "6"],
    correct: ["2", "3"]
  },
  {
    type: "text",
    question: "Fill in the blank: The sun rises in the ____.",
    correct: "east"
  }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuiz() {
  quizContainer.innerHTML = '';

  quizData.forEach((q, index) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;

    if (q.type === "single") {
      q.options.forEach(opt => {
        questionEl.innerHTML += `
          <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>
        `;
      });
    } else if (q.type === "multi") {
      q.options.forEach(opt => {
        questionEl.innerHTML += `
          <label><input type="checkbox" name="q${index}" value="${opt}"> ${opt}</label><br>
        `;
      });
    } else if (q.type === "text") {
      questionEl.innerHTML += `
        <input type="text" name="q${index}">
      `;
    }

    quizContainer.appendChild(questionEl);
  });
}

function getAnswers() {
  let score = 0;

  quizData.forEach((q, index) => {
    const name = `q${index}`;

    if (q.type === "single") {
      const answer = document.querySelector(`input[name="${name}"]:checked`);
      if (answer && answer.value === q.correct) score++;
    }

    if (q.type === "multi") {
      const answers = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
      if (arraysEqual(answers, q.correct)) score++;
    }

    if (q.type === "text") {
      const input = document.querySelector(`input[name="${name}"]`);
      if (input && input.value.trim().toLowerCase() === q.correct.toLowerCase()) score++;
    }
  });

  return score;
}

function arraysEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) &&
         a.length === b.length &&
         a.sort().every((val, index) => val === b.sort()[index]);
}

submitButton.addEventListener('click', () => {
  const score = getAnswers();
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
});

loadQuiz();
