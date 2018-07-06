var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Clientes', docs: docs });
  })
})

router.get('/edit/:id', function(req, res) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var email = req.body.email;
  var funcao = req.body.funcao;
  var idade = parseInt(req.body.idade);
  var telefone = parseInt(req.body.telefone);
  global.db.update(id, {nome, idade, funcao, email, telefone}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":"","email":"","funcao":"","telefone":""}, action: '/new' });
});

router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var funcao = req.body.funcao;
  var idade = parseInt(req.body.idade);
  var telefone = parseInt(req.body.telefone);
  global.db.insert({nome, idade, funcao, email, telefone}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
