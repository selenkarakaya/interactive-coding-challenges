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

// 1.6
// document.getElementById("max-btn").addEventListener("click", () => {
//   const input = document.getElementById("max-input").value;
//   const parts = input.split(/[,\s]+/);

//   let max = null;

//   for (let i = 0; i < parts.length; i++) {
//     let num = Number(parts[i]);

//     if (!Number.isNaN(num)) {
//       if (num > max) {
//         max = num;
//       }
//     }
//   }

//   document.getElementById("max-result").textContent =
//     max !== null ? max : "Invalid input";
// });
document.getElementById("max-btn").addEventListener("click", () => {
  const input = document.getElementById("max-input").value;
  const numbers = input
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => Number(item))
    .filter((item) => !Number.isNaN(item));

  if (numbers.length === 0) {
    document.getElementById("max-result").textContent = "Invalid input";
    return;
  }
  let max = Math.max(...numbers);

  document.getElementById("max-result").textContent =
    max !== null ? max : "Invalid input";
});

//1.7
document.getElementById("vowel-btn").addEventListener("click", () => {
  const input = document.getElementById("vowel-input").value.toLowerCase();
  if (!input.trim()) {
    document.getElementById("vowel-result").textContent = "Please enter text";
    return;
  }

  const vowels = "aeiou";

  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (vowels.includes(input[i])) {
      count++;
    }
  }

  document.getElementById("vowel-result").textContent = count;
});

//1.8

document.getElementById("duplicates-btn").addEventListener("click", () => {
  const input = document.getElementById("duplicates-input").value;

  const numbers = input
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => Number(item))
    .filter((item) => !Number.isNaN(item));

  if (numbers.length === 0) {
    document.getElementById("duplicates-result").textContent = "Invalid input";
    return;
  }

  let newNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    if (!newNumbers.includes(numbers[i])) {
      newNumbers.push(numbers[i]);
    }
  }

  document.getElementById("duplicates-result").textContent =
    newNumbers.join(", ");
});
