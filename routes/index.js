var express = require('express');
var router = express.Router();

let todoList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

router.post("/todo", (req, res) => {
  try {

    if(todoList.find(todo => todo.name === req.body.name)){
      todoList.find(todo => todo.name === req.body.name).task.push(req.body.task);
    }
    else{  
      todoList.push({
        name: req.body.name, 
        task: [req.body.task]
      });}
    res.send({
        list: todoList
      });
  } catch (error) {
      res.status(400).json({
          msg: "Invalid request"
      });
  }
});

module.exports = router;

// what is the difference bn res.send and res.render?
// res.send is used to send a response of any type, 
// while res.render is used to render a view template. 
// render can mean to 'display or provide' a view template