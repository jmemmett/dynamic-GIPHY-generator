//-----------------------
// Global Variables
//-----------------------

//-----------------------
// Function Definitions
//-----------------------

    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=d6zaT0FJmzC";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

//-----------------------
// Script
//-----------------------