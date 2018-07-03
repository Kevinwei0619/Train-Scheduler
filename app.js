 
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCKzngOQHMi21F2HsuuRv2P1B88xoT9eOs",
            authDomain: "kevin-firebase-7973d.firebaseapp.com",
            databaseURL: "https://kevin-firebase-7973d.firebaseio.com",
            projectId: "kevin-firebase-7973d",
            storageBucket: "kevin-firebase-7973d.appspot.com",
            messagingSenderId: "530298093558"
        };
        firebase.initializeApp(config);

        var db = firebase.database();
        var timeNow;
        var currentTime = moment();
        var count=0;
        
       


        $("#submit").on("click", function (event) {
            event.preventDefault();

            var trainName = $("#trainName").val().trim();
            var dest = $("#dest").val().trim();
            var firstTrainTime = $("#firstTrainTime").val().trim();
            var freq = $("#freq").val().trim();
            

            console.log("the time user type:" , firstTrainTime);

    

            var timeNow = moment(currentTime ,"MM/DD/YYYY , hh:mm A").format("dddd, MMMM Do YYYY, hh:mm A");
            console.log("CURRENT TIME: " + timeNow );

            var timeTest = moment(firstTrainTime , "dddd, MMMM Do YYYY, HH:mm a").format("hh:mm A");
            console.log("time user type:" +  timeTest);

            var firstTimeConverted = moment(firstTrainTime, "dddd, MMMM Do YYYY, HH:mm a").subtract(1, "days");    
            console.log( "time we converted:" , firstTimeConverted);



            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
        
            // Time apart (remainder)
            var tRemainder = diffTime % freq;
            console.log("the time remainder:",tRemainder);
        
            // Minute Until Train
            var tMinutesTillTrain = freq - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        
            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var arrivalTime = moment(nextTrain).format("dddd, MMMM Do YYYY, hh:mm A");
            console.log("ARRIVAL TIME: " + arrivalTime);
       



            // Code for "Setting values in the database"
            db.ref().push({
                name: trainName,
                dest: dest,
                freq: freq,
                firstTrainTime: firstTrainTime,
                arrivalTime: arrivalTime,
                minutesAway: tMinutesTillTrain,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });


            alert("added new Train");

            $("#trainName").val("");
            $("#dest").val("");
            $("#freq").val("");
            $("#firstTrainTime").val("");

        });


        $("#detel").on("click", function (event) {
            event.preventDefault();
            $("#trainName").val("");
            $("#dest").val("");
            $("#freq").val("");
            $("#firstTrainTime").val("");
        })



db.ref().on("child_added", function(childSnapshot) {
    var key = childSnapshot.key;
    console.log(key);
    

      
      // Log everything that's coming out of snapshot
    //   console.log(childSnapshot.val().name);
    //   console.log(childSnapshot.val().dest);
    //   console.log(childSnapshot.val().freq);
    //   console.log(childSnapshot.val().firstTrainTime);

$("#tbody").append("<tr class = item  id="+key+ "><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().dest + "</td><td>" +
childSnapshot.val().freq + "</td><td>" + childSnapshot.val().arrivalTime  + "</td><td>" + childSnapshot.val().minutesAway + " </td></tr>");
  
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


db.ref().on("child_removed" , function(snapshot){
    var firebaseID = snapshot.key;
    $("#" + firebaseID).remove();
})

$(document).on("click" , ".item" , function(e){
    var firebaseID = $(this).attr("id");
    db.ref(firebaseID).remove();
  

})