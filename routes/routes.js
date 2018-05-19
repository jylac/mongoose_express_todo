const router = require('express').Router();
const Todo = require('../models/todo');
 
// GESTION AFFICHAGE:
router.get('/', function(req, res) {
    Todo.find( { } ).then( function( results) {
        let todos = results.filter(function(todo){
            return !todo.done;
        });

        let doneTodos = results.filter(function(todo){
            return todo.done;
        })
        // return les vars todos & doneTodos
        res.render('index',   {  todos: todos,  doneTodos: doneTodos } );
    });
});
// END AFFICHAGE ++++++++++++++++++++++++++++++++++

// GESTION REQUETE POST : ADD
router.post( '/todos' , function(req, res) {
    let newTodo = new Todo( { description: req.body.description} );
    
    newTodo.save().then( function( result ) {
        console.log(result);
        res.redirect('/');
    })
    .catch(function(err){
        console.log(err);
        res.redirect('/');
    });
});

// GESTION REQUETE POST : DELETE
router.post( '/todos/:id/delete' , function(req, res) {
    let deleteID = req.params.id;
    
    Todo.findById(deleteID)
        .exec()
        .then(function(result){
            //sup
            result.remove();
            console.log('deleteID =' + result);
        }).then(function(result){
            res.redirect('/');
        })
});


// GESTION REQUETE POST: DONE
router.post('/todos/:id/completed', function(req, res) {
    let todoId = req.params.id;

    Todo.findById(todoId)
        .exec()
        .then(function(result){
            result.done = !result.done;
            return result.save();
        }).then(function(result){
            res.redirect('/');
        });
    console.log(req.params);
});

module.exports = router;