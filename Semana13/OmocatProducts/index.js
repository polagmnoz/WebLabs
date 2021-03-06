const MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    engines = require('consolidate'),
    fs = require('fs');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

//Conectarse a la base de datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('Products');
    //iniciar servidor
    var server = app.listen(1889);
});



app.get('/', (req, res) => {
    /*    db.collection('camisas')
        .find()
        .toArray((err, result) => {
            res.render('index', {
                camisas: result
            });//fin res.render
        })*/
    var product = db.collection('camisas')
        .find();
    
    if (req.query.artista) 
    product.filter({artista: req.query.artista});

        product.toArray((err, result) => {
        res.render('index', {
            camisas: result
        }); //fin res.render
    });

}); //fin get

app.get('/camisa/:id', (req, res) => {
    db.collection('camisas').find({nombre: req.params.id})
    .toArray((err, result) => {
        res.render(result);//fin res.render
    })
});

app.get('/checkout', (req, res) => {

        res.render('checkout');//fin res.render
 
});

app.get('/productosporId', (req, res) => {
    
});