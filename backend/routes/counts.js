const router = require('express').Router(); //rout we creating
let Table = require('../models/table.model'); // mongoose model we created

router.route('/title-id').get((req, res) => { //if theres a /title at the end
  Table.find() 
    .then((counts)=>{
      var titles_arr= []
      for(let i = 0 ; i < counts.length ; i ++ ){
        titles_arr.push({title: counts[i]._system_info_object.title,id: counts[i]._id })
      }
      res.json(titles_arr)
    }) 
    .catch(err => res.status(400).json('Error: ' + err)); //if theres error
});



router.route('/search/:id')
  .get(function(req, res ){
    Table.findById(req.params.id, function (err, table){
      var copy_table = new Table();
      copy_table._system_info_object =table._system_info_object
    
      if(!err) {
        console.log(table._system_info_object)
        return res.json(table)
      }
    
    if(err) {
      console.error('ERROR!', err.json);
    }
  })});

router.route('/copy/:id')
  .post(function(req,res){ 
    Table.findById(req.params.id, function (err, table) { 
      var copy_table = new Table();
      copy_table._system_info_object =table._system_info_object
      var curr_title= JSON.stringify(table._system_info_object.title)
      copy_table._system_info_object.title = "copy " + curr_title;
      //console.log(copy_table);
  
      copy_table.save(function (err,req) {
        if(err) {
            console.error('ERROR!', err.json);
      }})
    });      
});
  

router.route('/add').post((req, res) => { 
  const _system_info_object = req.body; 
  const newTable = new Table({_system_info_object}); //new table
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