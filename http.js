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
        db.all(query, (err, row) => {
            res(row);console.log(row);
            arr.push(row);
            Promise.all(arr)
                .then(results => {
                    res(results[0]);
                })
                .catch(err => console.log(err));
        });
    });
}
//
function req_method(req){
        if (req.method == 'POST') {
            let body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var POST = qs.parse(body);
                //console.log(body);
                //xx=body;
                //console.log(xx);
                return body;   
            });
        }
    
}





let filename = '';
const server = http.createServer((req, res) => {
    console.log(req.url);
    //
    ////
    /// Daten => von Client zu Server
    ///
    
    
    
    //let x =req_method(req);
    //console.log(req_method(req));
    
    
    
    //
    //   Daten => von Server zu Client 
    if (req.url == '/getData') {
        // arr beeinhaltet Daten von Database
        let arr = [];
        //arr.push(data_tabel());
        //if(xx.length <1)
        arr.push(data_tabel('SELECT * FROM Kategorie '));
        //else if(xx.length >1)
        //arr.push(data_tabel(`SELECT * FROM Produkt as p WHERE p.Kategorie_fk_id = (SELECT Kategorie_id FROM Kategorie as k WHERE k.Kategorie_name = "Epoxy Flooring") ` ));
        Promise.all(arr)
            .then(v => {
                console.log(v[0]);
                let str = "let data=" + JSON.stringify(v[0]);
                console.log(str);
                res.write(str);
                res.end();
            })
            .catch(err => console.error(err));
            



    }
    //else if(req.url == '/setdata'){
        
        
   // }
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
    if (req.method == 'POST') {
        let body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var POST = qs.parse(body);
            console.log(POST);console.log(POST.value);
             //xx=body;
            //console.log(xx);
            let arr2=[];
            arr2.push(data_tabel(`SELECT * FROM Produkt as p WHERE p.Kategorie_fk_id = (SELECT Kategorie_id FROM Kategorie as k WHERE k.Kategorie_name = "${POST.value}")` ));
            Promise.all(arr2)
                .then(v => {
                console.log(v[0]);
                let str2 = "let data2 =" + JSON.stringify(v[0]);
                console.log(str2);
                res.write(POST);
                res.end();
                })
                .catch(err => console.error(err));     
             });
    }

    
    
    


    
});
//



server.listen(8001);