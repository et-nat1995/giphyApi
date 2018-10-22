var apiKey = "W4Levs46SCG4pDs8bpWk3AJ5TbhN81iO";
var empyString = "";

var searchTerms = ["Cats", "Dogs", "Pie"];

// make buttons input.
// funciton to render buttons 
function renderButtons() {
    // emptys the div of buttons.
    $("#buttons").empty();

    for (var i = 0; i < searchTerms.length; i++) {
        var button = $("<button>");

        button.addClass("btn btn-info giphyGetter");
        button.attr("giphyRender", searchTerms[i]);
        console.log(searchTerms[i]);
        button.text(searchTerms[i]);

        $("#buttons").append(button);
    }
}

// function to make the ajax call and create the giphy stuff
function giphyRender() {
    var search = $(this).attr("giphyRender");

    var apiUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        for(var i = 0; i < results.length; i ++){
            var gifDiv = $("<div>");
            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
            var theGifImg = $("<img>");

            theGifImg.attr("src", results[i].images.fixed_width_still.url);
            theGifImg.attr("data-still", results[i].images.fixed_width_still.url);
            theGifImg.attr("data-animate", results[i].images.fixed_height.url);
            theGifImg.attr("data-state", "still");
            theGifImg.addClass("gif");

            gifDiv.attr("id", "flexMe");

            gifDiv.append(theGifImg);
            gifDiv.append(p);

            $("#renderSpot").prepend(gifDiv);
        }
    })
}

function playPauseGiphy(){
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}

// renders whatever buttons in the array that already exists
renderButtons();

$("#submit").on("click", function () {
    event.preventDefault();

    var gipphySearchButton = $("#searchTerm").val().trim();
    console.log(gipphySearchButton);

    searchTerms.push(gipphySearchButton);
    renderButtons();


});

$(document).on("click", ".giphyGetter", giphyRender);

$(document).on("click", ".gif", playPauseGiphy);