const firebase = require('firebase');
/*
  SET CONFIG FOR THE APP'S DATABASE
  SAVE IT ON AN OBJ
*/
const config = {
  apiKey: "AIzaSyCSLPgyw7nE1UjrlV5Qg-DBQJTX0aSXBLE",
  authDomain: "bbbproject-b458e.firebaseapp.com",
  databaseURL: "https://bbbproject-b458e.firebaseio.com/",
  storageBucket: "bbbproject-b458e.appspot.com"
};

/*
    INITIALIZE THE DATABASE, PASSING IN THE ALREADY CREATED CONFIG OBJ
*/
firebase.initializeApp(config);

/*
    CREATE A REFERENCE VARIABLE TO THE DATABASE
*/
const database = firebase.database();

/*
    @func createUser
    @param {str} firstName  
    @param {str} lastName  
    @param {str} email  
    @param {str} imgURL  
    @param {str} story  
    @param {str} resumeStr  
    @param {str} resumeURL  
    @param {arr} portfolio  
    @desc - pretty much sends in an obj to the already set path <cohort5_0/class5_2/fellows>
            while it does that, it creates a default key which is the id to retrieve the obj 
            data.
    @note - pre-wrote a function invokation below to show more or less how we'd use it.
*/
const createUser = (firstName, lastName, email, imgURL, story, resumeStr, resumeURL, portfolio=[]) => {
    database.ref('cohort5_0/class5_2/fellows').push({
            firstName,
            lastName,
            email,
            photo: imgURL,
            story,
            resumeStr,
            resumeURL,
            portfolio,
    }, e => {
        !(e) ? console.log(e) : `Saved data successfully`;
    });
}

// createUser('Jose', 'Rodriguez', 'joserodriguez@pursuit.org', '[insert imgURL]', '[insert story]', '[insert resumeStr]', '[insert resumeURL]', ['project1', 'project2']);
// createUser('Abdel', 'Oufkir', 'abdelwahaboufkir@pursuit.org', '[insert imgURL]', '[insert story]', '[insert resumeStr]', '[insert resumeURL]', ['project1', 'project2']);
/*
    @func readUser
    @param uid
    @desc - retrieves corresponding obj data by the id we provide when we invoke the func.
    @note - pre-wrote a function invokation below to show more or less how we'd use it. 
*/
const readUser = uid => {
    return firebase.database().ref('/cohort5_0/class5_2/fellows/' + uid).once('value').then(function(snapshot) {
        return snapshot.val();
    })
    .then(data => {
        console.log(data);
        console.log('Successfully retrieved data');
    })
    .catch(e => {
        console.log('Something went wrong', e.toString());
    });
}

// readUser('-LWXCSZaFd3qaceV4YIl');

// defineUsers is for internal usage only. it doesn't return anything.
// defineUsers takes no arguments, console logs an Object with the list of Id's as keys and the full name of the user of the corresponding ID as the value.

const defineUsers = () => {
    // this is the Obkect that will hold the 'ID's' as keys.
    const fellowsIDs = {};

    return firebase.database().ref('/cohort5_0/class5_2/fellows/').once('value').then(function(snapshot) {
        return snapshot.val();
    })
    .then(data => {
        // id retreived from the array of the keys of the data Object
        const id = Object.keys(data);
        id.forEach(ele => {
        // full name retrieved by concatenating first name and last name;
         const userWithId = `${data[ele].firstName} ${data[ele].lastName}`;
         fellowsIDs[ele] = userWithId;
        })
       
        console.log('Ids and UserNames Retrieved: \n', fellowsIDs);
    })
    .catch(e => {
        console.log('Something went wrong', e.toString());
    });
}

defineUsers();