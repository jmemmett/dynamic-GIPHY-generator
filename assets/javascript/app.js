//-----------------------
// Global Variables
//-----------------------

    var searchArray = ["Dog", "Cat", "Bird", "Monkey", "Squirrel", "Chipmunk", "Rooster"];

//-----------------------
// Function Definitions
//-----------------------

    // called on page load, and when the user enters a new type of animal and hits the submit button
    function populateButtons(searchArray, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();
        for ( var i = 0; i < searchArray.length; i++ ) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", searchArray[i]);
            a.text(searchArray[i]);
            $(areaToAddTo).append(a);
        }
    }

    // when the user clicks one of the buttons at the top of the screen (whether they appears on page load, or after entering a new animal name and hitting the submit button)
    $(document).on("click", ".searchButton", function(){

        $("#searches").empty(); // empties any previous GIPHYs that were displayed on the screen
        var giphy = $(this).data("type");
        var APIkey = "SECdCMebuT9s3iJbMSBVzzXEzz4iS4LH"; // this is my specific GIPHY API key
        var url = "https://api.giphy.com/v1/gifs/search?api_key=";
        var queryURL = url + APIkey + "&q=" + giphy + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for ( var i = 0; response.data.length; i++ ) {
                var searchDiv = $("<div class='search-item'>"); // creates a new div for each object in the returned array
                var rating = response.data[i].rating; // stores the rating for each object in the returned array
                var p = $("<p>").text("Rating: " + rating); // creates a new paragraph for each object in the returned array to display it's rating
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                searchDiv.append(image);
                searchDiv.append(p);
                $("#searches").append(searchDiv);
            }
        })
    })

    // changes an image from still to animated, or from animated to still when the user clicks them
    $(document).on("click", ".searchImage", function() {
        var state = $(this).data("state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animated"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    })

    // adds a new button to the buttons area when the user enters an animal name and hits submit
    $("#submit").on("click", function() {
        var newSearch = $("#giphy-input").eq(0).val();
        searchArray.push(newSearch);
        populateButtons(searchArray, "searchButton", "#buttonsArea");
        $("#giphy-input").val("");
        return false;
    })

//-----------------------
// Script
//-----------------------

    // On page load...
    $(function(){
        populateButtons(searchArray, "searchButton", "#buttonsArea");
    })