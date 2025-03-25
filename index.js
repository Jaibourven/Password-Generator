// Get all the elements we need from the HTML
const passwordDisplay = document.getElementById("password-display");
const includeNumbers = document.getElementById("include-numbers");
const includeSpecial = document.getElementById("include-special");
const copyButton = document.getElementById("copyButton");
const generateButton = document.getElementById("generateButton");
const desiredCharacters = document.getElementById("charNumberDesired");
const lengthDisplay = document.getElementById("lengthDisplay"); // You'll need to add this to your HTML

// Define our character sets
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const specials = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");

// Update the length display when slider moves
desiredCharacters.addEventListener("input", function() {
  lengthDisplay.textContent = this.value;
});

// Generate password when button is clicked
generateButton.addEventListener("click", function() {
  // Create character pool based on selected options
  let availableChars = [...letters]; // Start with letters
  
  // Add numbers if checkbox is checked
  if (includeNumbers.checked) {
    availableChars = availableChars.concat(numbers);
  }
  
  // Add special characters if checkbox is checked
  if (includeSpecial.checked) {
    availableChars = availableChars.concat(specials);
  }

  // Generate the password
  let passwordGenerated = "";
  const length = Number(desiredCharacters.value);
  
  for (let i = 0; i < length; i++) {
    // Get a random character from availableChars
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    passwordGenerated += availableChars[randomIndex];
  }
  
  // Display the password
  passwordDisplay.textContent = passwordGenerated;
});

// Copy password to clipboard
copyButton.addEventListener("click", function() {
  const password = passwordDisplay.textContent;
  
  // Check if there's a password to copy
  if (!password) {
    alert("Please generate a password first!");
    return;
  }
  
  // Try to copy to clipboard
  navigator.clipboard.writeText(password)
    .then(() => {
      // Success feedback
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 2000);
    })
    .catch(err => {
      console.error("Copy failed:", err);
      alert("Couldn't copy. Try selecting and copying manually.");
    });
});