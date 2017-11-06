
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

    $("input").val('');
});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log("Train Name: " + childSnapshot.val().trainName);
    console.log("Destination: " + childSnapshot.val().destination);
    console.log("First Train Time: " + childSnapshot.val().trainStartTime);
    console.log("Frequency: " + childSnapshot.val().frequency);

    // Set currentTime variable to current unix time
    let currentTime = moment().unix();

    // Convert the train frequency submitted by user to seconds and set to the 'trainIntervalInSeconds" var
    let trainIntervalInSeconds = childSnapshot.val().frequency * 60;

    // Convert the train start time submitted by user to unix time and set to trainStartTime var
    let trainStartTime = moment(childSnapshot.val().trainStartTime, "HH:mm").unix();

    // Subtract trainStartTime from currentTime, and set to variable "startTimeCurrentTimeDifference"
    let startTimeCurrentTimeDifference = currentTime - trainStartTime;

    // Divide "startTimeCurrentTimeDifference" by 'trainIntervalInSeconds', round the result up, and set to variable 'iterations'
    let iterations = Math.ceil(startTimeCurrentTimeDifference / trainIntervalInSeconds);

    // Multiply 'trainIntervalInSeconds' by 'interations', add product to trainStartTime, and set to variable 'nextArrival'
    let nextArrival = trainStartTime + (trainIntervalInSeconds * iterations);
    
    // Subtract currentTime (unix in seconds) from nextArrival (unix in seconds), multiply by 60 to get to minutes, and set to 'minutesAway' var
    let minutesAway = Math.ceil((nextArrival - currentTime)/60);
   
    // Change format of nextArrival to 'hh:mm AM/PM'
    nextArrival = moment.unix(nextArrival).format("LT");

    // append items to html
    $("#currentTrains").append(
        "<tr class='train'><td id='trainName'> " + childSnapshot.val().trainName +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td id='nextArrival'> " + nextArrival +
        " </td><td id='minutesAway'> " + minutesAway + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});