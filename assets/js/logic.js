// javascript

// functions

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAUmkblUeqpPb1Wh0kgsMyuiPLBw83jn3M",
    authDomain: "trainscheduler-986a9.firebaseapp.com",
    databaseURL: "https://trainscheduler-986a9.firebaseio.com",
    projectId: "trainscheduler-986a9",
    storageBucket: "",
    messagingSenderId: "861567155177"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// On click function for the submit button..
$('#submit-btn').on('click', function (event) {
    // Prevent page refresh
    event.preventDefault();

    // Assign inputs from form to variables..
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainStartTime = $("#trainStartTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // Push input values (as variables) to the database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainStartTime: trainStartTime,
        frequency: frequency
    });

});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().trainStartTime);
    console.log(childSnapshot.val().frequency);

    // Set current time to variable
    let currentTime = moment().format("HH:mm");
    console.log(currentTime);

    let interval = childSnapshot.val().frequency
    console.log(interval)

    //Set nextArrival var to trainStartTime.
    let trainStartTime = moment(childSnapshot.val().trainStartTime, "HH:mm").format("HH:mm");
    console.log(nextArrival);

    ///Subtract trainStartTime from currentTime, and set to variable "startTimeCurrentTimeDifference"

    // Divide "startTimeCurrentTimeDifference" by 'interval', round the result up, and set to variable 'iterations'

    // Mulltiply 'interval' by 'interations', add product to trainStartTime, and set to variable 'nextArrival'

    //var minutesAway = nextArrival minus currentTime

    // full list of items to the well
    $("#currentTrains").append(
        "<tr class='train'><td id='trainName'> " + childSnapshot.val().trainName +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td id='nextArrival'> " + nextArrival +
        " </td><td id='minutesAway'> " + "minutesAway" + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});