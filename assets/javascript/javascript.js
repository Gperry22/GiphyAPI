var nbaTeamComplete = [
  "atlanta hawks", "boston celtics", "new jersey nets", "charlotte hornets", "chicago bulls",
  "cleveland cavaliers", "dallas mavericks", "denver nuggets", "detroit pistons", "golden state warriors",
  "houston rockets", "indiana pacers", "la clippers", "los angeles lakers", "memphis grizzlies",
  "miami heat", "milwaukee bucks", "minnesota timberwolves", "new orleans pelicans", "new york knicks",
  "oklahoma city thunder", "orlando magic", "philadelphiasixers", "phoenix suns", "portland trail blazers",
  "sacramento kings", "san antonio spurs", "toronto raptors", "utah jazz", "washington wizards"
];
var nbaTeamInitial = ["cleveland cavaliers", "golden state warriors", "washington wizards", "houston rockets", "milwaukee bucks"];
var nbaTeamSearch = [];
var rating = 'pg';
var limit = 12;
var api_key = 'rEoeTyn8Nv7uM7X0Yim5lOnAHYFWYePT';
var gifSearch = false;

// Runs the 5 default team buttons
defaultTeamBtns(nbaTeamInitial)

// Default Team buttons function
function defaultTeamBtns(array) {
  for (var i = 0; i < array.length; i++) {
    addTeamBtn(array[i]);
  }
};

function addTeamBtn(teamName) {
  // Get the index of the matching name token
  const index = nbaTeamComplete.indexOf(teamName.toLowerCase().trim());

  // Check that the name was found
  if (index >= 0) {

    // Step 1 create a button for teamName
    var name = teamName.toUpperCase().trim();
    // console.log(name);
    var teamButton = $('<button>' + name + '</button>');
    teamButton.addClass('searchTeam');
    teamButton.addClass('button');
    //add styleclass
    teamButton.attr({
      id: name.toLowerCase(),
      value: name.toLowerCase(),
    });
    $('#teams').append(teamButton);

    // Step 2 remove teamName from list to avoid duplicates
    nbaTeamComplete.splice(index, 1);

    // Step 3 keep a list of Buttons already in user
    nbaTeamSearch.push(teamName.toLowerCase().trim());
  } else {

    // let's find out why we cannot add teamName
    const index = nbaTeamSearch.indexOf(teamName.toLowerCase().trim());

    // duplicate name check
    if (index !== -1) {
      // name is already in use
      alert('Duplicate Team name already exist: ' + teamName.toUpperCase());
    } else {
      alert('Unknown Team Name: ' + teamName.toUpperCase() + ' Please make sure to include, NBA City and Team.');
    }
  }
}


$("#searchForm").submit(function(event) {
  // First make sure the form does not submit
  event.preventDefault();

  // get the teamName (value of input text id = searchInput)
  var teamName = $("#searchInput").val().trim().split().join('');

  // log teamName and try to add it
  // console.log(teamName);
  $("#searchInput").val("")
  addTeamBtn(teamName);
});


$('#teams').on("click", "button", function() {
  gifSearch = true;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.id + "&rating=" + rating + "&api_key=" + api_key + "&limit=" + limit;
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      // console.log(response);
      $('#gifs').empty();
      clearLogo();
      $.each(response.data, function(i, value) {
        var url = value.images.fixed_height_still.url;
        var image = $("<img>");
        image.addClass('col-md-4 gifSize gifmargin')
        image.attr('src', url);
        image.attr('data-still', value.images.fixed_height_still.url);
        image.attr('data-animate', value.images.fixed_height.url);
        image.attr('data-state', "still");

        $('#gifs').append(image);
      });

      $('#gifs').on("click", "img", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
});

$('#clear').on('click', function() {
  $('#gifs').empty();
  gifSearch = false;
  addLogo();
})

// Adding the basketball player images
addLogo();

function addLogo() {
  if (gifSearch === false) {
    $('#ball').empty();
    var basketball = $("<img>");
    var url = "assets/images/lbj.png"
    basketball.attr('src', url);
    basketball.addClass('logoSize w3-animate-opacity');
    $('#ball').append(basketball);
    setTimeout(addLogo2, 5000);
  }
}

function addLogo2() {
  if (gifSearch === false) {
    $('#ball').empty();
    var basketball = $("<img>");
    var url = "assets/images/sc.png"
    basketball.attr('src', url);
    basketball.addClass('logoSize w3-animate-opacity');
    $('#ball').append(basketball);
    setTimeout(addLogo3, 5000);
  }
}

function addLogo3() {
  if (gifSearch === false) {
    $('#ball').empty();
    var basketball = $("<img>");
    var url = "assets/images/ga.png"
    basketball.attr('src', url);
    basketball.addClass('logoSize w3-animate-opacity');
    $('#ball').append(basketball);
    setTimeout(addLogo4, 5000);
  }
}

function addLogo4() {
  if (gifSearch === false) {
    $('#ball').empty();
    var basketball = $("<img>");
    var url = "assets/images/jh.png"
    basketball.attr('src', url);
    basketball.addClass('logoSize w3-animate-opacity');
    $('#ball').append(basketball);
    setTimeout(addLogo, 5000);
  }
}

// Function to clear logo when gifs are called
function clearLogo() {
  $('#ball').empty();
}
