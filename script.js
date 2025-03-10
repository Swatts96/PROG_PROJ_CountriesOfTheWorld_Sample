// Author: Sam Watts
// Date: Dec 2023
// Course: LogProg1700
// Instructor: Hamlet Lin

document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const countryDropdown = document.getElementById("countryDropdown");
    const flagImage = document.getElementById("flagImage");
    const selectedCountryName = document.getElementById("selectedCountryName");
    const populationDisplay = document.getElementById("populationValue");
    const worldPopulationPercentageDisplay = document.getElementById("percentageValue");
    const areaDisplay = document.getElementById("areaValue");
    const wikiButton = document.getElementById("wikiButton");
    const areaDropdown = document.getElementById("areaDropdown");
    const densityResultDisplay = document.getElementById("densityResultDisplay");
  
    let countries = [];
  
    // 1. Fetch and load country data
    loadCountries();
  
    // 2. Event Listeners
    countryDropdown.addEventListener("change", onCountryChange);
    areaDropdown.addEventListener("change", onAreaChange);
  
    // Radio buttons for population density
    document.querySelectorAll('.density-radio input[name="populationDensity"]').forEach(function (radio) {
      radio.addEventListener('change', updateDisplayedPopulationDensity);
    });
  
    // 3. Functions
  
    // Load countries from JSON
    function loadCountries() {
      fetch("countries.json")
        .then((response) => response.json())
        .then((data) => {
          countries = data;
          populateDropdown(countries);
          setDefaultCountry("Canada");
        })
        .catch((error) => {
          console.error("Error fetching countries.json:", error);
        });
    }
  
    // Populate the country dropdown
    function populateDropdown(countriesArray) {
      countriesArray.forEach(function (country) {
        const option = document.createElement("option");
        option.value = country.Name;
        option.text = country.Name;
        countryDropdown.appendChild(option);
      });
    }
  
    // Set default country (e.g., Canada)
    function setDefaultCountry(defaultName) {
      const defaultIndex = countries.findIndex((c) => c.Name === defaultName);
      if (defaultIndex !== -1) {
        countryDropdown.selectedIndex = defaultIndex;
        countryDropdown.dispatchEvent(new Event("change"));
      }
    }
  
    // Event handler: on country change
    function onCountryChange() {
      const selectedCountry = countryDropdown.value;
      const countryData = countries.find((c) => c.Name === selectedCountry);
      if (!countryData) return;
  
      // Update UI
      updateCountryInfo(countryData);
      updateFlag(selectedCountry);
      updateDisplayedPopulationDensity(); // Re-calc density
      // Setup Wiki button
      setupWikiButton(selectedCountry);
    }
  
    // Update country info (population, area, etc.)
    function updateCountryInfo(countryData) {
      selectedCountryName.textContent = countryData.Name;
      populationDisplay.textContent = countryData.Population;
      areaDisplay.textContent = countryData.Area;
  
      // Calculate world population
      const worldPopulation = calculateWorldPopulation(countries);
      const percentage = calculateWorldPopulationPercentage(countryData.Population, worldPopulation);
      worldPopulationPercentageDisplay.textContent = percentage;
    }
  
    // Setup the Wiki button link
    function setupWikiButton(countryName) {
      const normalizedWikiName = countryName.replace(/\s+/g, "_");
      const wikiLink = "https://en.wikipedia.org/wiki/" + normalizedWikiName;
      wikiButton.onclick = function () {
        window.location.href = wikiLink;
      };
    }
  
    // Update the displayed flag image
    function updateFlag(countryName) {
      // Normalize for file name (replace spaces with underscores)
      const normalizedName = normalizeCountryName(countryName);
      const flagFilePath = "flags/" + normalizedName + ".png";
  
      // Set the flag src
      flagImage.src = flagFilePath;
      // If the image fails to load, show a placeholder
      flagImage.onerror = function () {
        this.src = "flags/placeholder.png";
      };
    }
  
    // Handle area display (sq miles vs sq km)
    function onAreaChange() {
      const selectedCountry = countryDropdown.value;
      const selectedCountryData = countries.find((c) => c.Name === selectedCountry);
      if (!selectedCountryData) return;
  
      if (areaDropdown.value === "SqMiles") {
        areaDisplay.textContent = selectedCountryData.Area;
      } else if (areaDropdown.value === "SqKilometers") {
        const areaInKilometers = selectedCountryData.Area * 1.6;
        areaDisplay.textContent = areaInKilometers.toFixed(2);
      }
    }
  
    // Update population density
    function updateDisplayedPopulationDensity() {
      const selectedCountry = countryDropdown.value;
      const countryData = countries.find((c) => c.Name === selectedCountry);
      if (!countryData) {
        densityResultDisplay.textContent = "N/A";
        return;
      }
  
      const population = countryData.Population;
      const selectedRadio = document.querySelector('.density-radio input[name="populationDensity"]:checked');
      if (!selectedRadio) return;
  
      if (selectedRadio.value === "PerSqMile") {
        densityResultDisplay.textContent = (population / countryData.Area).toFixed(2);
      } else if (selectedRadio.value === "PerSqKilometer") {
        densityResultDisplay.textContent = (population / (countryData.Area * 1.6)).toFixed(2);
      } else {
        densityResultDisplay.textContent = "N/A";
      }
    }
  
    // Helper: normalize country name for flags
    function normalizeCountryName(name) {
      // Replace spaces with underscores, handle special chars if needed
      return name.replace(/\s+/g, "_");
    }
  
    // Calculate world population
    function calculateWorldPopulation(countriesArray) {
      return countriesArray.reduce((total, c) => total + c.Population, 0);
    }
  
    // Calculate percentage of world population
    function calculateWorldPopulationPercentage(countryPop, worldPop) {
      if (!worldPop) return "N/A";
      const percentage = (countryPop / worldPop) * 100;
      return percentage.toFixed(2) + "%";
    }
  });
  