const express = require('express');
/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();

var JSAlert = require("js-alert");

const session = require('express-session');
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");

const crypto = require('crypto');

// initializari socket.io
const http=require('http');
const socket = require('socket.io');
const server = new http.createServer(app);
var  io= socket(server);
io = io.listen(server);//asculta pe acelasi port ca si serverul


//setez o sesiune
app.use(session({
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
}));

var conexiune_index;
io.on("connection", (socket) => {
    console.log("Esti pe server!");
    conexiune_index=socket;
    socket.on('disconnect', () => {conexiune_index=null;console.log('Nu mai esti pe server')});
});



async function trimiteMail(nume, prenume, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',

        secure: false,
        auth: {
            user: "test.tweb.node@gmail.com", //mailul site-ului (de aici se trimite catre user)
            pass: "tehniciweb"
        },
        tls: {
            rejectUnauthorized: false//pentru gmail
        }
    });

    //trimitere mail
    let info = await transporter.sendMail({
        from: '"test.tweb.node" <test.tweb.node@example.com>',
        to: email,
        subject: "înregistrare nouă",
        text: "Bine ai venit, " + nume,
        html: " <h1> Salut, " + prenume + " </h1> " + " <p>Ne bucurăm că te-ai alăturat. Începe să valorifici site-ul</p>"
    });

    console.log("Message sent: %s", info.messageId);
}

async function sendComandaMail(nume, prenume, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',

        secure: false,
        auth: {
            user: "test.tweb.node@gmail.com", //mailul site-ului (de aici se trimite catre user)
            pass: "tehniciweb"
        },
        tls: {
            rejectUnauthorized: false//pentru gmail
        }
    });

    let info = await transporter.sendMail({
        from: '"test.tweb.node" <test.tweb.node@example.com>',
        to: email,
        subject: "Comandă nouă",
        text: "Salut, "+ nume,
        html: "<h1> Salut, " + prenume + "</h1>" + "<p> Ai efectuat o nouă comandă.</p>"
    });

    console.log("Comanda trimisa: %s", info.messageId);
}

function getJson(numeFis){
    let textFis = fs.readFileSync(numeFis);//pun continutul fisierului useri.json in rawdata
    return JSON.parse(textFis);//obtin obiectul asociat json-ului
}

function saveJson(obJson, numeFis){
    let data = JSON.stringify(obJson);//transform in JSON
    fs.writeFileSync(numeFis, data);//scriu JSON-ul in fisier (inlocuind datele vechi)
}

serverPass="tralala";

// pentru folosirea ejs-ului
app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(express.static(__dirname));

// ########################################################## Pentru APP ##############################

//setez folderele statice (cele in care nu am fisiere generate prin node)
app.use('/css', express.static('css'));
app.use('/pictures', express.static('pictures'));
app.use('/javascript', express.static('javascript'));
app.use('/uploads', express.static('uploads'));
app.use('/audio', express.static('audio'));
app.use('/video', express.static('video'));
app.use('/jsonFiles', express.static('jsonFiles'));

// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {
    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */

    let rawdata = fs.readFileSync('jsonFiles/producatori.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.producatori);

    produse = getJson("jsonFiles/producatori.json");

    res.render('html/index',{producatori: jsfis.producatori, user: req.session.username});


});


app.get('/logout', function(req, res) {
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
    res.render('html/logout');
});

// ############################################################# LOGIN

app.post('/contulMeu', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        jsfis = getJson('jsonFiles/producatori.json');
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encrParola;
        encrParola = cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
        encrParola += cifru.final('hex');
        let user = jsfis.producatori.find(function (x) {
            return(x.username == fields.username && x.parola == encrParola);
        });
        if(user){
            console.log(req.session.username);
            console.log(user.nume);
            console.log(user.parola);
            console.log(encrParola);
            req.session.username=user;//setez userul ca proprietate a sesiunii

            let rawdataR = fs.readFileSync('jsonFiles/producatori.json');
            let jsfisR = JSON.parse(rawdataR);

            let rawdataCom = fs.readFileSync('jsonFiles/comenzi.json');
            let jsfisCom = JSON.parse(rawdataCom);

            let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
            let jsfisClient = JSON.parse(rawdataClient);

            res.render('html/utilizatorProducator', {producatori: jsfisR.producatori, comenzi: jsfisCom.comenzi, clienti: jsfisClient.clienti, user: req.session.username});
        }
        else{
            jsfis = getJson('jsonFiles/clienti.json');
            var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
            var encrParola;
            encrParola = cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
            encrParola += cifru.final('hex');
            let user = jsfis.clienti.find(function (x) {
                return(x.username == fields.username && x.parola == encrParola);
            });
            if(user){
                console.log(req.session.username);
                console.log(user.nume);
                console.log(user.parola);
                console.log(encrParola);
                req.session.username=user;//setez userul ca proprietate a sesiunii

                let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
                let jsfisClient = JSON.parse(rawdataClient);

                res.render('html/utilizatorClient', {clienti: jsfisClient.clienti ,user: req.session.username});
            }
            else {
                console.log("Nu are cont");
                //window.alert("Nu aveti cont!");
                // var popup = require('popups');
                //
                // popup.alert({
                //     content: 'Nu aveti cont!'
                // });
                res.render('html/contulMeu');
            }
            /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
        }

    });
});

app.get('/register', function(req, res) {
    res.redirect('/inregistrare_producator');//la cererea paginii /register redirectez catre pagina inregistrare_producator

    res.redirect('/inregistrare_client');//la cererea paginii /register redirectez catre pagina inregistrare_client
});
// ##################################################### Afisare in galerie a producatorilor

app.get('/galerie', function (req, res) {
    let rawdata = fs.readFileSync('jsonFiles/producatori.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.producatori);

    produse = getJson("jsonFiles/producatori.json");

    res.render('html/galerie',{producatori: jsfis.producatori, user: req.session.username});
    //todo res.render('html/galerie',{producatori: jsfis.producatori, user: req.session.username, produse:produse.produse});
});

app.get('/galerie', function (req, res) {
    let rawdata = fs.readFileSync('jsonFiles/clienti.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.clienti);

    //TODO MODIFICA MAI JOS IN jsfis.clienti
    res.render('html/galerie',{clienti: jsfis.producatori, user: req.session.username});
});

// ##################################################### Inregistrare producator

app.get('/inregistrare_producator', function(req, res) {
    //console.log(req.session.username);
    res.render('html/inregistrare_producator', {user: req.session.username});
});

app.post('/inregistrare_producator', (req, res) => {
    var form = new formidable.IncomingForm(); //obiect de tip form cu care parsez datele venite de la utilizator
    form.parse(req, function (err, fields, files) {
        //parsarea datelor

        console.log('file uploaded : ' + files.poza.path);//verific calea buna in consola
        var calePoza=(files.poza && files.poza.name!="")?files.poza.name:""; //verific daca exista poza (poza este numele campului din form

        //var calePoza = files.poza.name; //verific daca exista poza, unde poza este numele campului din form
        let rawdata = fs.readFileSync('jsonFiles/producatori.json');
        let jsfis = JSON.parse(rawdata); //parsez textul si obtin obiectul asociat JSON-ului

        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encrParola = cifru.update(fields.parola, 'utf8', 'hex');
        encrParola += cifru.final('hex');
        console.log(fields.parola + " " + encrParola);

        jsfis.producatori.push({id: jsfis.lastId, email: fields.email, parola:encrParola ,nume: fields.nume, prenume:fields.prenume,
                                oras: fields.oras, localitate: fields.localitate, dataInreg: new Date(), rol: 'producator', produse: fields.produse, poza: calePoza});
        jsfis.lastId++;

        saveJson(jsfis, 'jsonFiles/producatori.json');
        res.render('html/inregistrare_producator', {user: req.session.username, rsstatus:"ok"});

        trimiteMail(fields.nume, fields.prenume ,fields.email).catch((err) => {console.log(err)});
    });

    form.on('fileBegin', function (name, file) {
        //if(file && file.size){
        file.path = __dirname + '/uploads/' + file.name; //inainte de upload setez calea la care va fi uploadat
        //'/uploads/'
        console.log("cale:"+ file.path);
        //}
    });

    form.on('file', function (name, file){
        if(file && file.size){
            console.log('Uploadat ' + file.name);//la finalul uploadului afisez un mesaj
        }
    });

});

// ###################################################### Adaugare produse de catre utilizator


// ###################################################### Inregistare client

app.get('/inregistrare_client', function(req, res) {
    //console.log(req.session.username);
    res.render('html/inregistrare_client', {user: req.session.username});
    //, {user: req.session.username}
});


app.post('/inregistrare_client', (req, res) => {
    //var dateForm = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //
        console.log('file uploaded : ' + files.poza.path);//verific calea buna in consola
        var calePoza=(files.poza && files.poza.name!="")?files.poza.name:""; //verific daca exista poza (poza este numele campului din form

        let rawdata = fs.readFileSync('jsonFiles/clienti.json');
        let jsfis = JSON.parse(rawdata);

        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encrParola = cifru.update(fields.parola, 'utf8', 'hex');
        encrParola += cifru.final('hex');
        console.log(fields.parola + " " + encrParola);

        jsfis.clienti.push({id:jsfis.lastId, email: fields.email, parola: encrParola, nume: fields.nume, prenume: fields.prenume,
                           oras: fields.oras, localitate: fields.localitate, dataInreg: new Date(), rol:'client', poza: calePoza});

        jsfis.lastId++;

        res.render('html/inregistrare_client', {user: req.session.username, rsstatus:"ok"});
        saveJson(jsfis, 'jsonFiles/clienti.json');

        trimiteMail(fields.nume, fields.prenume ,fields.email).catch((err) => {console.log(err)});
    });

    form.on('fileBegin', function (name, file) {
        //if(file && file.size){
        file.path = __dirname + '/uploads/' + file.name; //inainte de upload setez calea la care va fi uploadat
        //'/uploads/'
        console.log("cale:"+ file.path);
        //}
    });

    form.on('file', function (name, file){
        if(file && file.size){
            console.log('Uploadat ' + file.name);//la finalul uploadului afisez un mesaj
        }
    });
});

// ########################################################## Se apasa butonul

app.get('/buton', function(req, res) {
    res.render('html/buton', {user: req.session.username});
});

app.post('/buton', function(req, res) {
    console.log("apasat")
    if(conexiune_index){
        console.log(conexiune_index)
        conexiune_index.emit("buton", { refresh: true });
    }
    res.render('html/buton', {user: req.session.username});

});

//############################################################### Afisarea producatorilor si clientilor

app.get('/useri', function(req, res) {
    let rawdata = fs.readFileSync('jsonFiles/producatori.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.producatori);

    res.render('html/useri',{useri:jsfis.useri,user: req.session.username});
});



// ############################################################## Celelalte pagini

app.get('/contact', function(req, res) {
    res.render('html/contact', {user: req.session.username});
});
app.get('/contulMeu', function(req, res) {
    res.render('html/contulMeu', {user: req.session.username});
});
app.get('/despre', function(req, res) {
    res.render('html/despre', {user: req.session.username});
});
app.get('/galerie', function(req, res) {
    res.render('html/galerie', {user: req.session.username});
});
app.get('/topuriProd', function(req, res) {
    let rawdata = fs.readFileSync('jsonFiles/producatori.json');
    let jsfis = JSON.parse(rawdata);

    res.render('html/topuriProd', {producatori: jsfis.producatori, user: req.session.username});
});
app.get('/utilizatorProducator', function(req, res) {
    let rawdata = fs.readFileSync('jsonFiles/producatori.json');
    let jsfis = JSON.parse(rawdata);

    let rawdataCom = fs.readFileSync('jsonFiles/comenzi.json');
    let jsfisCom = JSON.parse(rawdataCom);

    //comenzi = getJson("jsonFiles/comenzi.json");

    let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
    let jsfisClient = JSON.parse(rawdataClient);

    res.render('html/utilizatorProducator', {comenzi: jsfisCom.comenzi, clienti: jsfisClient.clienti, producatori: jsfis.producatori, user: req.session.username});
});
app.get('/utilizatorClient', function(req, res) {
    let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
    let jsfisClient = JSON.parse(rawdataClient);

    res.render('html/utilizatorClient', {clienti: jsfisClient.clienti, user: req.session.username});
});
app.get('/comanda', function(req, res) {
    let rawdataProd = fs.readFileSync('jsonFiles/producatori.json');
    let jsfisProd = JSON.parse(rawdataProd);

    let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
    let jsfisClient = JSON.parse(rawdataClient);

    res.render('html/comanda', { producatori: jsfisProd.producatori, clienti: jsfisClient.clienti ,user: req.session.username});
});

app.post('/comanda', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let rawdata = fs.readFileSync('jsonFiles/comenzi.json');
        let jsfis = JSON.parse(rawdata);

        let rawdataClient = fs.readFileSync('jsonFiles/clienti.json');
        let jsfisClient = JSON.parse(rawdataClient);

        jsfis.comenzi.push({id:jsfis.lastId, email: req.session.username.email, parola: req.session.username.parola, nume: req.session.username.nume, prenume: req.session.username.prenume, dataComenzii: new Date(),
            produse: fields.produse, cantitate: fields.cantitate, producator: fields.producator});

        jsfis.lastId++;

        saveJson(jsfis, 'jsonFiles/comenzi.json');
        sendComandaMail(req.session.username.nume, req.session.username.prenume , req.session.username.email).catch((err) => {console.log(err)});
    })



});


// ############################################################## Pagina de 404

app.use(function(req,res){
    res.status(404).render('html/404');
});

app.get('/404', function(req, res) {
    res.render('html/404');
});


// ############################################################# Pornirea aplicatiei

var PORT = process.env.PORT || 8080;
server.listen(PORT);
console.log('Aplicatia se va deschide pe portul 8080.');
