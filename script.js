function factorial(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }

  return result;
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
  const maxVariant = factorial(input.length);

  if (maxVariant - anagramHistory.length < amount || amount > maxVariant) {
    return "No more variants";
  }

  while (anagrams.length < Math.min(amount, maxVariant)) {
    const anagram = getAnagram(input);

    if (!anagramHistory.includes(anagram)) {
      anagramHistory.push(anagram);
      anagrams.push(anagram);
    }
  }

  if (anagrams.length > 1) {
    return anagrams.join(" / \n");
  } else {
    return anagrams;
  }
}

function getInput() {
  const inputValue = document.getElementById("inputField").value.toUpperCase();

  return inputValue;
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
  outputText.style.fontSize = "2rem";
  outputText.style.marginTop = "3.5rem";
}

const anagramHistory = [];
const amount = 3;
const generateButton = document.getElementById("generateButton");
const restartButton = document.getElementById("restartButton");
const enterTitle = document.getElementById("enterTitle");
const inputField = document.getElementById("inputField");
const genNumber = document.getElementById("generateNumber");
let outputText = document.getElementById("outputText");

generateButton.addEventListener("click", function () {
  const input = getInput();
  if (input.length > 1) {
    startSession(input);
    if (input.length > 14) {
      setSmallerFontSize();
    }
  }
});

restartButton.addEventListener("click", function () {
  window.location.reload();
});
