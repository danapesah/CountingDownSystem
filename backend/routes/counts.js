const router = require('express').Router(); //rout we creating
let Table = require('../models/table.model'); // mongoose model we created

router.route('/').get((req, res) => { //if theres a / at the end
  Table.find() //mongoose methode  get a list of all the users from thr db
    .then(counts => res.json(counts)) //get all the users
    .catch(err => res.status(400).json('Error: ' + err)); //if theres error
});

router.route('/add').post((req, res) => { 
  const c = req.body; //expect int the body req the username

  const newTable = new Table({c}); //new user

  //console.log(newTable + "newCount")
  newTable.save() //save to the db
    .then(() => res.json('countdown added!')) //return user added in jason
    .catch(err => res.status(400).json('Error: ' + err)); //or error
});

module.exports = router; //standart thing 