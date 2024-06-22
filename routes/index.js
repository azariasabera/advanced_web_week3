var express = require('express');
var router = express.Router();

let todoList = [
  { name: 'Alice', task: ['Buy milk', 'Read book'] },
  { name: 'Bob', task: ['Write report', 'Meet client'] }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

router.post("/todo", (req, res) => {
  try {

    if(todoList.find(todo => todo.name === req.body.name)){
      todoList.find(todo => todo.name === req.body.name).task.push(req.body.task);
      res.send("Todo added");
    }

    else{  
      todoList.push({
        name: req.body.name, 
        task: [req.body.task]
      });
      res.send("User added");
    }
  } catch (error) {
      res.status(400).json({
          msg: "Invalid request"
      });
  }
});

router.get("/user/:id", (req, res) => {
  let name = req.params.id;
  let user = todoList.find(todo => todo.name === name);
  if(user){
    //res.render('user', {name: user.name, task: user.task})
    res.json(user);
  }
  else{
    //res.status(400).render('error', {error: "User not found"});
    res.status(404).json({msg: "User not found"});
  }
})

module.exports = router;

// what is the difference bn res.send and res.render?
// res.send is used to send a response of any type, 
// while res.render is used to render a view template. 
// render can mean to 'display or provide' a view template


router.delete("/user/:id", (req, res) => {
  let name = req.params.id;
  let user = todoList.find(todo => todo.name === name);
  if(user){
    todoList = todoList.filter(todo => todo.name !== name);
    res.json({msg: "User deleted"});
  }
  else{
    res.status(404).json({msg: "User not found"});
  }
});