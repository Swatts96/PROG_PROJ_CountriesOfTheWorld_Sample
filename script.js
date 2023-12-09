//Author: Sam Watts
//Date: Dec 2023
//Course: LogProg1700 
//Instructor: Hamlet Lin

            //PSEUDO wiki\\
/*For each country in the list of countries:
    Create an option element
    Set the value of the option to the country name
    Set the text of the option to the country name

    // Create an anchor element for the Wikipedia link
    Create a wikiLink element
    Set the href attribute of wikiLink to "https://en.wikipedia.org/wiki/" + country.Name // Adjust the URL structure if needed
    Set the text content of wikiLink to " (Wikipedia)"

    // Append the anchor element to the option element
    Append wikiLink to the option element
    // Append the option element to the dropdown
*/

    // HTML WILL DISPLAY \\ 
    // Name of the Country! (done)
    // An image of the country's flag (done)
    // the population of the country 
    // the country's total area, shown in sq. miles (by default) or sq. kilometres, according to user preference (refer to previous assignments(similar to KG conversion))
    // The Country's population density per square mile (by default) or square KM, according to user preference ()
    // The country's percentage of the total world population

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

            // set variable for our defaultCountryIndex that will be used to retrieve default flag instead of blank 
            var defaultCountryIndex = countries.findIndex(country => country.Name === "Canada");
            dropdown.selectedIndex = defaultCountryIndex;
     
              // Trigger the change event to load the default flag
              var event = new Event("change");
              dropdown.dispatchEvent(event);
            })
              .catch(error => console.error("Error fetching countries.json:", error));
            //Catch error for missing files/mis-path 
            //This sets up an event listener for the dropdown menu. When a country is selected, it retrieves the selected country, generates the corresponding flag image file name, constructs the file path, and updates the src attribute of the flag image element to display the selected country's flag.
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
