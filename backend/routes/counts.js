const router = require('express').Router(); //rout we creating
let Table = require('../models/table.model'); // mongoose model we created

router.route('/').get((req, res) => { //if theres a / at the end
  Table.find() //mongoose methode  get a list of all the users from thr db
    .then(counts => res.json(counts)) //get all the tables
    .catch(err => res.status(400).json('Error: ' + err)); //if theres error
});

router.route('/add').post((req, res) => { 
  const _system_info_object = req.body; 
 
  const newTable = new Table({_system_info_object}); //new table

  //console.log(newTable + "newCount")
  newTable.save() //save to the db
    .then(() => res.json('countdown added!')) //return table added in jason
    .catch(err => res.status(400).json('Error: ' + err)); //or error
});

 router.route('/:id').delete((req, res) => { //DELETE the wanted id
  Table.findByIdAndDelete(req.params.id)
    .then(() => res.json('Table deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/edit/:id').post((req, res) => { //UPDATE the wanted id 
  Table.findById(req.params.id)
    .then(table => {
      table._system_info_object = req.body;

      table.save()
        .then(() => res.json('Table updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; //standart thing 