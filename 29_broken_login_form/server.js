/* 

  Our login form is broken!

  Right now, users can get through with any password. Try it out.

  Help!

  1. Only let users through if they enter the password 'dog'.
     (Hint: you'll need body-parser to get the form info)
  2. Return a 401 if any other password is entered.

  Beast mode:

  1. Only let users through if they also check "I agree".
  2. Add an email field to the login form. Update your password check.
  3. Store a list of users, along with their passwords in an array of objects.
     Update your password check to use this array for authentication.
  4. Keep count of login failures. Display these on the 401 page.
     E.g. "You've tried to login 3 times". Make sure it works per user.
  5. Reset the login failures to 0 if they successfully log in.
  6. Store the users in mongo instead on this file.
  
*/

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Allow access to everything in /public.
// This is for our stylesheets & images.
app.use(express.static('public'));

// Views #thepuglifechoseme
app.set('view engine', 'pug')

app.get("/", (req, res) => {
  res.render('login');
});

app.post("/secure", (req, res) => {
  let password = req.body.password;
  let check = req.body.agree;
  if (password === 'dog' && check === true) {
    console.log(`Password ${password} entered, logged in`);
    res.render("secure");
  } else if (password === 'dog' && !check === true) {
    console.log('User did not agree');
    res.status(401).send('You must agree before proceeding');
  } else {
    console.log('Wrong password entered');
    res.status(401).send('Wrong password!');
  }
});

app.listen(3000);
console.log("Lift off!");
