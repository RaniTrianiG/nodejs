var express = require('express');
var router = express.Router();
var db = require('../db');



/* GET home page. */

//FRONTEND VIEW
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM tamu", function(error, results, fields){
    if(error) throw error;
    console.log(results);
    return res.render('view', {
      data: results
    });
  });
});

router.get('/welcome', function(req, res){
  res.render('contoh', {
    nama:'Rani Triani'
  });
});

//FRONTEND CREATE
router.get('/create', function(req, res){
  return res.render('create', {
    error: false
  });
});

//INSERT
router.post('/create', function(req,res){
  var data = req.body;
  if(data.nama==='' || data.teks===''){
    return res.render('create', {
      error: true
    });
  }
  db.query("INSERT INTO tamu(nama, teks) VALUES( ? , ? )", [data.nama, data.teks], function(error ,results, fields){
    if(error) throw error;
    return res.redirect('/');
  });
  
});

//DELETE
router.get('/delete/:id', function(req,res){
  var id = req.params.id;
  db.query("DELETE FROM tamu WHERE id=?",id,function(error, results, fields){
    if(error) throw error;
    return res.redirect('/');
  });
});

//EDIT
router.get('/edit/:id', function(req,res){
  var id = req.params.id;
  db.query("SELECT id, nama, teks FROM tamu WHERE id=?",id,function(error, results, fields){
    if(error) throw error;
    return res.render('edit',{
      data:results,
      error:false
    });
  });
});

router.post('/edit', function(req,res){
  var data = req.body;
  db.query("UPDATE tamu SET nama=?,teks=? WHERE id=?",[data.nama, data.teks, data.id], function(error, results, fields){
    if(error) throw error;
    return res.redirect('/');
  });
});
module.exports = router;
