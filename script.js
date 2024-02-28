const generateButton = document.getElementById("generateButton");
const restartButton = document.getElementById("restartButton");
const enterTitle = document.getElementById("enterTitle");
const inputField = document.getElementById("inputField");
let genNumber = document.getElementById("generateNumber");
let outputText = document.getElementById("outputText");
let amount = 1;
let userInput;
let anagramHistory = [];

function factorial(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }

  return result;
}

function getInput() {
  const inputValue = inputField.value.trim().toUpperCase();

  return inputValue;
}

function getSizeWoDuplicate(input) {
  let set = new Set(input);

  return set.size;
}

function getAnagram(name) {
  let splitted = name.toUpperCase().split("");

  for (let i = splitted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [splitted[i], splitted[j]] = [splitted[j], splitted[i]];
  }

  return splitted.join("").trim();
}

function getAnagramArray(input, amount) {
  const anagrams = [];
  const maxVariants = factorial(getSizeWoDuplicate(input));
  const remainingVariants = maxVariants - anagramHistory.length;

  if (remainingVariants === 0) {
    return "No more variants";
  }

  const generateAmount = Math.min(amount, remainingVariants);

  while (anagrams.length < generateAmount) {
    const anagram = getAnagram(input);

    if (!anagramHistory.includes(anagram)) {
      anagramHistory.push(anagram);
      anagrams.push(anagram);
    }
  }

  return anagrams.join(" / ");
}

function setGenerateNumber() {
  if (amount === 1) {
    amount = 3;
    genNumber.textContent = 3;
  } else if (amount === 3) {
    amount = 5;
    genNumber.textContent = 5;
  } else if (amount === 5) {
    amount = 1;
    genNumber.textContent = 1;
  }
}

function startSession(input) {
  enterTitle.innerHTML = input;
  outputText.innerHTML = getAnagramArray(input, amount);
  inputField.classList.add("hidden");
  genNumber.classList.add("hidden");
  outputText.classList.remove("hidden");
  generateButton.textContent = "Get anagram(s)";
}

function setSmallerFontSize() {
  enterTitle.style.fontSize = "2rem";
  outputText.style.fontSize = "1.5rem";
}

generateButton.addEventListener("click", function () {
  userInput = getInput();
  if (userInput.length > 1) {
    startSession(userInput);
    if (userInput.length > 9 && screen.width < 750) {
      setSmallerFontSize();
    }
  }
});

genNumber.addEventListener("click", function () {
  setGenerateNumber();
});

restartButton.addEventListener("click", function () {
  window.location.reload();
});
