//Author: Sam Watts
//Date: Dec 2023
//Course: LogProg1700 
//Instructor: Hamlet Lin
 // This part ensures that the script runs after the HTML document has been completely loaded. 
 //also defines a function for the entire html, so building within this. (stop adding functions outside) 

document.addEventListener("DOMContentLoaded", function() {

    var dropdown = document.getElementById("countryDropdown");
    var flagImage = document.getElementById("flagImage");
    var selectedCountryName = document.getElementById("selectedCountryName");
    var populationDisplay = document.getElementById("populationValue");
    var worldPopulationPercentageDisplay = document.getElementById("percentageValue");
    var areaDisplay = document.getElementById("areaValue");

    var countries; // Variable to store the JSON data
    const worldPopulation = 7888888888; // Variable to store world population
   
    fetch("countries.json") //fetch api retrieving contents of our countries.json file
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
                dropdown.appendChild(option);
            });
            // Default Country/Home Country (Assigning a home page)
            // set variable for our defaultCountryIndex that will be used to retrieve default flag instead of blank 
            var defaultCountryIndex = countries.findIndex(country => country.Name === "Canada");
            dropdown.selectedIndex = defaultCountryIndex;
            // Trigger the change event to load the default flag (event comments)
            // Event being a term we haven't used much, but w3 explains well. 
            // any change, event or anything that happens to an html element upon command, in this case changing the flag countryIndex to Canada
            var event = new Event("change");
            dropdown.dispatchEvent(event);
        })
        .catch(error => console.error("Error fetching countries.json:", error));
    
    dropdown.addEventListener("change", function() {
        var selectedCountry = dropdown.value;
        //Set the flag image source based on the selected country
        var flagFileName = selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1) + ".png"; 
        var flagFilePath = "flags/" + flagFileName;
        //Update the flag image
        flagImage.src = flagFilePath;

        
        // Find the selected country in the JSON data
        var selectedCountryData = countries.find(country => country.Name === selectedCountry);

        // Update HTML content
        selectedCountryName.textContent = selectedCountry;
        populationDisplay.textContent = selectedCountryData ? selectedCountryData.Population : "N/A";
        worldPopulationPercentageDisplay.textContent = selectedCountryData ? calculateWorldPopulationPercentage(selectedCountryData.Population) : "N/A";
        areaDisplay.textContent = selectedCountryData ? selectedCountryData.Area : "N/A";
   
    });
})

// Function to calculate world population
function calculateWorldPopulation(countries) {
    return countries.reduce((total, country) => total + country.Population, 0);
}

// Function to calculate world population percentage
function calculateWorldPopulationPercentage(countryPopulation) {
    return ((countryPopulation / worldPopulation) * 100).toFixed(2) + "%";
}


 // Fetch comments
    // These lines select HTML elements respectively. 
    //- Dropdown menu for selecting countries and an image tag for displaying the flag.
    //- populating our population container with the "Population" data (sorry)
    // Fetch JSON data from the file
    // This fetches the JSON data from the "countries.json" file. The fetch function returns a promise. The then method is used to handle the result of this asynchronous operation.

//Catch error for missing files/mis-path 
    //This sets up an event listener for the dropdown menu. When a country is selected, it retrieves the selected country, generates the corresponding flag image file name, 
    //constructs the file path, and updates the src attribute of the flag image element to display the selected country's flag.


// add function for determining world pop % (parseint(Country pop / 7,888,000,0000).tofixed(2))