var express = require('express');
var router = express.Router();

/* GET the User list */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  db.collection('userlist').find().toArray(function(err, items, next){
    res.json(items);
  });
});

/* POST to add a user */
router.post('/adduser', function(req, res, next){
    var db = req.db;

    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* DELETE to delete user */
router.delete('/deleteuser/:id', function(req, res, next){
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result){
        res.send((result === 1) ? {msg: ''} : {msg: 'error:' + err});
    });
}); 

module.exports = router;
