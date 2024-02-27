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

  return anagrams;
}

function getInput() {
  const inputValue = document.getElementById("inputField").value.toUpperCase();

  return inputValue;
}

function setSmallerFontSize() {
  outputText.style.fontSize = "2rem";
  outputText.style.marginTop = "3.5rem";
}

const anagramHistory = [];

// get anagrams
//const anagrams = getAnagramArray(input, amount);

const amount = 1;
const generateButton = document.getElementById("generateButton");
const restartButton = document.getElementById("restartButton");
let outputText = document.getElementById("outputText");

generateButton.addEventListener("click", function () {
  const input = getInput();
  if (input.length > 1) {
    document.getElementById("enterTitle").innerHTML = input;
    outputText.innerHTML = getAnagramArray(input, amount);
    document.getElementById("inputField").classList.add("hidden");
    outputText.classList.remove("hidden");
    if (input.length > 14) {
      setSmallerFontSize();
    }
  }
});

restartButton.addEventListener("click", function () {
  window.location.reload();
});
