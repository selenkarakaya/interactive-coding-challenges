const helloBtn = document.getElementById("hello-btn");
const helloResult = document.getElementById("hello-result");

helloBtn.addEventListener("click", () => {
  helloResult.textContent = "Hello World!";
});

const sumBtn = document.getElementById("sum-btn");
const sumResult = document.getElementById("sum-result");

sumBtn.addEventListener("click", () => {
  const num1 = Number(document.getElementById("sum-num1").value);
  const num2 = Number(document.getElementById("sum-num2").value);

  sumResult.textContent = `Sum: ${num1 + num2}`;
});

const reverseBtn = document.getElementById("reverse-btn");
const reverseResult = document.getElementById("reverse-result");

reverseBtn.addEventListener("click", () => {
  const text = document.getElementById("reverse-input").value;
  const reversed = text.split("").reverse().join("");

  reverseResult.textContent = `Reversed: ${reversed}`;
});
