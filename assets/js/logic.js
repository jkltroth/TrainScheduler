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
    var trainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // Push input values (as variables) to the database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().frequency);

    // var monthsWorked = moment().diff(moment((childSnapshot.val().startDate), "MM-DD-YYYY"), "months");

    var currentTime = moment();

    // var totalBilled = monthsWorked * (childSnapshot.val().rate);

    // full list of items to the well
    $("#currentTrains").append(
        "<tr class='train'><td id='trainName'> " + childSnapshot.val().trainName +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td id='nextArrival'> " + "nextArrival" +
        " </td><td id='minutesAway'> " + "minutesAway" + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
// });