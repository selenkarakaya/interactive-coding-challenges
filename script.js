/*
Basic challenges 1
*/

// 1.1
const userInput = document.getElementById("userInput");
const helloBtn = document.getElementById("hello-btn");
const result = document.getElementById("hello-result");

helloBtn.addEventListener("click", () => {
  result.textContent = `Hello World! + ${userInput.value}`;
});

// 1.2
const sumBtn = document.getElementById("sum-btn");
const sumResult = document.getElementById("sum-result");

sumBtn.addEventListener("click", () => {
  const num1 = Number(document.getElementById("sum-num1").value);
  const num2 = Number(document.getElementById("sum-num2").value);
  const operator = document.querySelector("input[name=operator]:checked").value;
  if (!operator) {
    sumResult.textContent = "Please select an operator!";
    return;
  }

  let output;

  switch (operator) {
    case "+":
      output = num1 + num2;
      break;
    case "-":
      output = num1 - num2;
      break;
    case "*":
      output = num1 * num2;
      break;
    case "**":
      output = num1 ** num2;
      break;
    case "/":
      output = num2 != 0 ? num1 / num2 : "Cannot divide by 0";
      break;
  }
  sumResult.textContent = `Result: ${output}`;
});

// 1.3
document.getElementById("reverse-btn").addEventListener("click", () => {
  const word = document.getElementById("reverse-input").value;
  const sentence = document.getElementById("reverse-input2").value;
  let reversed = "";
  for (let i = word.length - 1; i >= 0; i--) {
    reversed += word[i];
  }

  let reversedSentence = [];

  for (let word of sentence.split(" ")) {
    let wordReversed = word.split("").reverse().join("");

    reversedSentence.push(wordReversed);
  }

  document.getElementById(
    "reverse-result"
  ).textContent = `Word: ${reversed} | Sentence: ${reversedSentence}`;
});

//1.4
document.getElementById("palindrome-btn").addEventListener("click", () => {
  const word = document.getElementById("palindrome-input").value.toLowerCase();

  const reversed = word.split("").reverse().join("");

  document.getElementById("palindrome-result").textContent = word === reversed;
});

//1.5
const resultBox = document.getElementById("occurrences-result");

document.getElementById("occurrences-btn").addEventListener("click", () => {
  const input = document
    .getElementById("occurrences-input")
    .value.toLowerCase();

  const char = document.getElementById("occurrences-char").value.toLowerCase();

  if (!input) {
    resultBox.textContent = "Please enter some text";
    return;
  }

  if (!char || char.length !== 1) {
    resultBox.textContent = "Please enter a single character";
    return;
  }

  let count = 0;
  for (let letter of input) {
    if (letter === char) count++;
  }

  resultBox.textContent = `Count: ${count}`;
});
