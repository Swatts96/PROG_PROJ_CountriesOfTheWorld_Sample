//Author: Sam Watts
//Date: Dec 2023
//Course: LogProg1700 
//Instructor: Hamlet Lin

document.addEventListener("DOMContentLoaded", function() {
    // This part ensures that the script runs after the HTML document has been completely loaded. 

    var dropdown = document.getElementById("countryDropdown");
    var flagImage = document.getElementById("flagImage");
    var populationDisplay = document.getElementById("populationDisplay");
    var areaDisplay = document.getElementById("areaDisplay");

    const worldPop = 7888000000;

    // Fetch comments
    // These lines select HTML elements respectively. 
    //- Dropdown menu for selecting countries and an image tag for displaying the flag.
    //- populating our population container with the "Population" data (sorry)
    // Fetch JSON data from the file
    // This fetches the JSON data from the "countries.json" file. The fetch function returns a promise. The then method is used to handle the result of this asynchronous operation.
    fetch("countries.json")
        .then(response => response.json())
        .then(countries => {
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
            // any change, event or anything that happens to an html element upon command, in this case changing the flag countryIndex to Canada by default. 
            var event = new Event("change");
            dropdown.dispatchEvent(event);
        })
        .catch(error => console.error("Error fetching countries.json:", error));
    //Catch error for missing files/mis-path 
    //This sets up an event listener for the dropdown menu. When a country is selected, it retrieves the selected country, generates the corresponding flag image file name, 
    //constructs the file path, and updates the src attribute of the flag image element to display the selected country's flag.

    dropdown.addEventListener("change", function() {
        var selectedCountry = dropdown.value;
        //Set the flag image source based on the selected country
        var flagFileName = selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1) + ".png"; 
        var flagFilePath = "flags/" + flagFileName;
        //Update the flag image
        flagImage.src = flagFilePath;
    });
})


// add function for determining world pop % (parseint(Country pop / 7,888,000,0000).tofixed(2))