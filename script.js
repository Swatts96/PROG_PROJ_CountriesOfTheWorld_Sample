//Author: Sam Watts
//Date: Dec 2023
//Course: LogProg1700 
//Instructor: Hamlet Lin


document.addEventListener("DOMContentLoaded", function() {  
    // This part ensures that the script runs after the HTML document has been completely loaded. 
    
    var dropdown = document.getElementById("countryDropdown");
    var flagImage = document.getElementById("flagImage");
   // These lines select HTML elements with the IDs "countryDropdown" and "flagImage", respectively. These elements are presumably a dropdown menu for selecting countries and an image tag for displaying the flag.
    
    // Fetch JSON data from the file
    // This fetches the JSON data from the "countries.json" file. The fetch function returns a promise. The then method is used to handle the result of this asynchronous operation.
    fetch("countries.json")
        .then(response => response.json())
        .then(countries => { 

            // Once the JSON data is successfully fetched and parsed as an array of country objects, this part creates an option element for each country, sets its value and text properties to the country name, and appends it to the dropdown menu.
            // TLDR Populate the dropdown with country names
            countries.forEach(function(country) {
                var option = document.createElement("option");
                option.value = country.Name;
                option.text = country.Name;
                dropdown.appendChild(option);
            });

            // Event listener for dropdown change
            //This sets up an event listener for the dropdown menu. When a country is selected, it retrieves the selected country, generates the corresponding flag image file name, constructs the file path, and updates the src attribute of the flag image element to display the selected country's flag.
            dropdown.addEventListener("change", function() {
                var selectedCountry = dropdown.value;

                // Set the flag image source based on the selected country
                var flagFileName = selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1) + ".png";
                var flagFilePath = "flags/" + flagFileName;

                // Update the flag image
                flagImage.src = flagFilePath;
            });
        })
        .catch(error => console.error("Error fetching countries.json:", error));
        // If there's an error during the fetching process, it logs an error message to the console.
});
