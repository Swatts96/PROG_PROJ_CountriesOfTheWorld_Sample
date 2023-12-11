//Author: Sam Watts
//Date: Dec 2023
//Course: LogProg1700 
//Instructor: Hamlet Lin
//Ready for Marking
//Ready for marking redo 

 // This part ensures that the script runs after the HTML document has been completely loaded. 
 //also defines a function for the entire html, so building within this. (stop adding functions outside) 
 document.addEventListener("DOMContentLoaded", function() {

    var countryDropdown = document.getElementById("countryDropdown");
    var flagImage = document.getElementById("flagImage");
    var selectedCountryName = document.getElementById("selectedCountryName");
    var populationDisplay = document.getElementById("populationValue");
    var worldPopulationPercentageDisplay = document.getElementById("percentageValue");
    var areaDisplay = document.getElementById("areaValue");
    var wikiButton = document.getElementById("wikiButton");
    var areaDropdown = document.getElementById("areaDropdown");
    var countries; // Variable to store the JSON data

    var densityResultDisplay = document.getElementById("densityResultDisplay");

    // Fetch API comments
    // These lines select HTML elements respectively. 
    //- Dropdown menu for selecting countries and an image tag for displaying the flag.
    //- populating our population container with the "Population" data (sorry)
    // Fetch JSON data from the file
    // This fetches the JSON data from the "countries.json" file. The fetch function returns a promise. The then method is used to handle the result of this asynchronous operation.

    fetch("countries.json") 
        .then(response => response.json())
        .then(countriesData => {
            countries = countriesData; // 3 hours troubleshooting for this one missing line 
            // Individual Country Comments
            // Once the JSON data is successfully fetched and parsed as an array of country objects, this part creates an option element for each country, 
            // sets its value and text properties to the country name, and appends it to the dropdown menu.
            countries.forEach(function(country) {
                var option = document.createElement("option");
                option.value = country.Name;
                option.text = country.Name;
                countryDropdown.appendChild(option);
            });
            // Default Country/Home Country (Assigning a home page)
            // set variable for our defaultCountryIndex that will be used to retrieve default flag instead of blank 
            var defaultCountryIndex = countries.findIndex(country => country.Name === "Canada");
            countryDropdown.selectedIndex = defaultCountryIndex;
            // Trigger the change event to load the default flag (event comments)
            // Event being a term we haven't used much, but w3 explains well. 
            // any change, event or anything that happens to an html element upon command, in this case changing the flag countryIndex to Canada
            var event = new Event("change");
            countryDropdown.dispatchEvent(event);
        })
        .catch(error => console.error("Error fetching countries.json:", error));
    
        countryDropdown.addEventListener("change", function() {
        var selectedCountry = countryDropdown.value;
        //Set the flag image source based on the selected country
        var countryName = selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1); 
        var flagFilePath = "flags/" + countryName + ".png";
        var wikiLink = "https://en.wikipedia.org/wiki/" + countryName;

        //"this" will occur upon click, 
        wikiButton.addEventListener('click', function() {
            // Change the link by setting the window.location.href property
            window.location.href = wikiLink;
            console.log(wikiLink);
        });

        areaDropdown.addEventListener("change", function() {
            updateDisplayedArea();
        });
        
        function updateDisplayedArea() {
            var selectedOption = areaDropdown.value;
            var selectedCountryData = countries.find(country => country.Name === countryDropdown.value);
        
            if (selectedCountryData) {
                if (selectedOption === "SqMiles") {
                    areaDisplay.textContent = selectedCountryData.Area;
                } else if (selectedOption === "SqKilometers") {
                    var areaInKilometers = selectedCountryData.Area * 1.6;
                    areaDisplay.textContent = areaInKilometers.toFixed(2);
                }
            } else {
                areaDisplay.textContent = "N/A";
            }
        }
        

     

        //radio button query selector/event listener, in order to retrieve population density using our selectedCountryData to use current Population and Area within our calculations 
        document.querySelectorAll('.density-radio input[name="populationDensity"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
                updateDisplayedPopulationDensity();
            });
        });
        //Function to calculate population density 
        function updateDisplayedPopulationDensity() {
            var selectedCountryData = countries.find(country => country.Name === countryDropdown.value);
            var populationValue = selectedCountryData ? selectedCountryData.Population : 0;
    
            // Check the selected radio button for population density unit
            var selectedRadio = document.querySelector('.density-radio input[name="populationDensity"]:checked');
            
            if (selectedRadio.value === "PerSqMile") {
                var populationDensity = populationValue / selectedCountryData.Area;
                densityResultDisplay.textContent = populationDensity.toFixed(2);
            } else if (selectedRadio.value === "PerSqKilometer") {
                var populationDensity = populationValue / (selectedCountryData.Area * 1.6);
                densityResultDisplay.textContent = populationDensity.toFixed(2);
            } else {
                densityResultDisplay.textContent = "N/A";
            }
        }








        

        //Update the flag image
        flagImage.src = flagFilePath;

        // Find the selected country in the JSON data
        var selectedCountryData = countries.find(country => country.Name === selectedCountry);
            var worldPopulation = calculateWorldPopulation(countries);

        // Update HTML content
        selectedCountryName.textContent = selectedCountry;

        populationDisplay.textContent = selectedCountryData ? selectedCountryData.Population : "N/A";

        worldPopulationPercentageDisplay.textContent = selectedCountryData ? calculateWorldPopulationPercentage(selectedCountryData.Population, worldPopulation) : "N/A";

        areaDisplay.textContent = selectedCountryData ? selectedCountryData.Area : "N/A";
    }); //comment more to explain use of ? 
    
})


 // Function to calculate world population
 function calculateWorldPopulation(countries) {
    return countries.reduce((total, country) => total + country.Population, 0);
}

// Function to calculate world population percentage
function calculateWorldPopulationPercentage(countryPopulation, worldPopulation) {
    return ((countryPopulation / worldPopulation) * 100).toFixed(2) + "%";
}



//Catch error for missing files/mis-path 
    //This sets up an event listener for the dropdown menu. When a country is selected, it retrieves the selected country, generates the corresponding flag image file name, 
    //constructs the file path, and updates the src attribute of the flag image element to display the selected country's flag.
