// -------------------------------
// Game State Variables
// -------------------------------
let inWater = false;               // Track if the character is currently in the water
let temperature = 0;               // Current temperature level
const maxTemperature = 100;        // Maximum temperature before triggering "Svinerød"
let temperatureInterval = null;    // Interval ID for temperature increase

// -------------------------------
// DOM Element References
// -------------------------------
const tempBar = document.getElementById('temp-bar');
const tempLabel = document.getElementById('temp-label');
const popups = document.getElementById('popups');

// -------------------------------
// Core Game Functions
// -------------------------------

/**
 * Function to handle entering the water.
 * - Sets the game state.
 * - Displays the entry popup.
 * - Initiates temperature increase.
 */
function enterWater() {
  if (inWater) return; // Prevent multiple calls
  inWater = true;
  
  // Show entry pop-up message
  showPopup("Yxi, kaxi & Kooolme");

  // Start increasing temperature if not already started
  if (temperatureInterval === null) {
    startTemperatureIncrease();
  }
}

/**
 * Function to handle leaving the water.
 * - Resets the game state.
 * - Displays the exit popup.
 * - Stops the temperature incrementation.
 */
function leaveWater() {
  if (!inWater) return;
  inWater = false;
  
  // Show exit pop-up message
  showPopup("Muddasir & Muddasey gik sig en tur. Hvad skete der så?");

  // Stop temperature increase
  if (temperatureInterval !== null) {
    clearInterval(temperatureInterval);
    temperatureInterval = null;
  }
}

/**
 * Starts an interval to gradually increase the temperature.
 * Calls updateTempBar() to reflect changes visually.
 * If temperature reaches maxTemperature, displays the "Svinerød" label.
 */
function startTemperatureIncrease() {
  temperatureInterval = setInterval(() => {
    // Only increase temperature if character is still in water
    if (!inWater) {
      clearInterval(temperatureInterval);
      temperatureInterval = null;
      return;
    }
    
    // Increase temperature gradually
    temperature = Math.min(temperature + 1, maxTemperature);
    updateTempBar();

    // When temperature reaches the maximum, display label and stop further increases
    if (temperature >= maxTemperature) {
      tempLabel.textContent = "Svinerød";
      clearInterval(temperatureInterval);
      temperatureInterval = null;
    }
  }, 100); // Increase temperature every 100ms
}

/**
 * Updates the temperature bar based on the current temperature value.
 */
function updateTempBar() {
  // Calculate percentage for the visual representation
  const percentage = (temperature / maxTemperature) * 100;
  tempBar.style.height = percentage + "%";
}

/**
 * Creates a temporary popup message on the screen.
 * The message will disappear after a set duration.
 * @param {string} message - The message to display.
 */
function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  popups.appendChild(popup);

  // Remove the popup after 2 seconds
  setTimeout(() => {
    popup.remove();
  }, 2000);
}

// -------------------------------
// Event Handling for Controls
// -------------------------------

// Listen for keyboard events:
// Pressing the "W" key to simulate entering water
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'w') {
    enterWater();
  }
});

// Releasing the "W" key simulates leaving the water
document.addEventListener('keyup', (e) => {
  if (e.key.toLowerCase() === 'w') {
    leaveWater();
  }
});

// Optional: Additional mouse event handlers can be added here if needed for further interactions.
