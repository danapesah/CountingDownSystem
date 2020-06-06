const router = require('express').Router(); //rout we creating
let User = require('../models/user.model'); // mongoose model we created

router.route('/').get((req, res) => { //if theres a / at the end
  User.find() //mongoose methode  get a list of all the users from thr db
    .then(users => res.json(users)) //get all the users
    .catch(err => res.status(400).json('Error: ' + err)); //if theres error
});

router.route('/add').post((req, res) => { 
  
  const username =req.body.username;
  const password =req.body.password;
  const permissions =req.body.permissions;

  const user_info ={username,password, permissions}; 

  const newUser = new User({user_info}); //new user

  newUser.save() //save to the db
    .then(() => res.json('User added!')) //return user added in jason
    .catch(err => res.status(400).json('Error: ' + err)); //or error
});

module.exports = router; //standart thing `