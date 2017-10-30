// javascript

// functions

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQutCgUBAPV6irOcIIe4nYU7Z4k9mm-bs",
    authDomain: "billablehours-8d506.firebaseapp.com",
    databaseURL: "https://billablehours-8d506.firebaseio.com",
    projectId: "billablehours-8d506",
    storageBucket: "",
    messagingSenderId: "839388582447"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$('#submit-btn').on('click', function (event) {
    event.preventDefault();

    var name = $("#employeeName").val().trim();
    var role = $("#employeeRole").val().trim();
    var rate = $("#monthlyRate").val().trim();
    var startDate = $("#startDateInput").val().trim();

    console.log(startDate);

    database.ref().push({
        name: name,
        role: role,
        rate: rate,
        startDate: startDate
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().rate);
    console.log(childSnapshot.val().startDate);

    var monthsWorked = moment().diff(moment((childSnapshot.val().startDate), "MM-DD-YYYY"), "months");

    var totalBilled = monthsWorked * (childSnapshot.val().rate);

    // full list of items to the well
    $("#currentEmployees").append(
        "<tr class='employee'><td id='name'> " + childSnapshot.val().name +
        " </td><td id='role'> " + childSnapshot.val().role +
        " </td><td id='startDateCol'> " + childSnapshot.val().startDate +
        " </td><td id='monthsWorked'> " + monthsWorked +
        " </td><td id='rate'> " + childSnapshot.val().rate +
        " </td><td id='totalBilled'> " + totalBilled + " </td></tr>");

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