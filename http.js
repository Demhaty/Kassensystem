const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const qs = require('querystring');
//
// query = ? 
//
// Um Daten von Tabelle Kategorie zu erhalten
function data_tabel(query) {
    return new Promise((res, rej) => {
        let db = new sqlite3.Database('Kassensystem.db');
        //let query = 'SELECT * FROM Kategorie ';
        let arr = [];
        if(!query.startsWith('INSERT')){//.startsWith
        db.all(query, (err, row) => {
            res(row);
            console.log(row);
            arr.push(row);
            Promise.all(arr)
                .then(results => {
                    res(results[0]);
                })
                .catch(err => console.log(err));
        });}
        else{
            db.run(query);
            let ok='OK Insert done';
            res(ok);
        }
    });
}
//
let filename = '';
const server = http.createServer((req, res) => {
    console.log(req.url);
    //
    //   Daten => von Server zu Client 
    if (req.url == '/getData') {
        // arr beeinhaltet Daten von Database
        let arr = [];
        arr.push(data_tabel('SELECT * FROM Kategorie '));
        Promise.all(arr)
            .then(v => {
                console.log(v[0]);
                let str = "let data=" + JSON.stringify(v[0]);
                console.log(str);
                res.write(str);
                res.end();
            })
            .catch(err => console.error(err));
    }else if (req.method == 'POST' && req.url == "/setData2"){
        let body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var POST2 = [];
            POST2.push(JSON.parse(body));
            console.log(POST2);
            //
            //
                res.setHeader('Access-Control-Allow-Origin', '*'); // '*'=> Dömenen
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD'); //Methods req
                res.setHeader('Access-Control-Allow-Credentials', true);            
                res.setHeader('Access-Control-Allow-Headers', '*'); //User Agent
                let arr2 = [];
                arr2.push(data_tabel(`INSERT INTO Berechnung(Datum) VALUES("${POST2[0].value.datum}")`));
                let B_fk_id = POST2[0].value.Berechnung_fk_id+1;
                POST2[0].value.Produkt.forEach((v,i) => {
                    arr2.push(data_tabel(`INSERT INTO Berechnungsposition(Berechnung_fk_id,Produkt_fk_id, Anzahl,Preis) VALUES("${B_fk_id}","${v.value.Produkt_id}","${v.anzahl}","${v.value.preis}")`));            
                });
                Promise.all(arr2)
                    .then(v => {
                        let str = JSON.stringify(v);
                        res.write(str);
                        res.end();
                    })
                    .catch(err => console.error(err));
            //
            //
        });
    } 
    else if (req.method == 'POST' && req.url == "/setData") {
        let body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var POST = [];
            POST.push(JSON.parse(body));
            console.log(POST);
            console.log(POST[0].value);
            res.setHeader('Access-Control-Allow-Origin', '*'); // '*'=> Dömenen
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD'); //Methods req
            res.setHeader('Access-Control-Allow-Credentials', true);            
            res.setHeader('Access-Control-Allow-Headers', '*'); //User Agent
            //
            //
            let arr2 = [];
            arr2.push(data_tabel(`SELECT * FROM Produkt as p WHERE p.Kategorie_fk_id = (SELECT Kategorie_id FROM Kategorie as k WHERE k.Kategorie_name = "${POST[0].value}")`));
            Promise.all(arr2)
                .then(v => {
                    let str = JSON.stringify(v[0]);
                    res.write(str);
                    res.end();
                })
                .catch(err => console.error(err));
        });
    }
    //
    // um HTML und Javascript Deiten auf Server hochzuladen
    else {
        filename = req.url.substring(1);

        if (filename.length == 0) {
            filename = 'index.html';
        }
        fs.readFile(filename, (err, data) => {
            if (!err) {
                res.write(data.toString());
            }
            res.end();
        });

    }
});
//
server.listen(8001);