const g = require("./js/All.js");
console.log(g.number_of());



const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3');


let filename = 'index.html';
const server = http.createServer((req, res) => {
    console.log(req.url);
    
    filename = req.url.substring(1);
    //console.log(filename);
    //console.log(arr);
    //console.log(hh());

    if (filename.length == 0) {
        filename = 'index.html';
    }



    fs.readFile(filename, (err, data) => {
        if (!err) {
            
            res.write(data.toString());
            
        }
        res.end();
    });


});

server.listen(8001);
//

function show_data() {
   
    let db = new sqlite3.Database('Kassensystem.db');
    let query = 'SELECT * FROM Kategorie ';
    let arr = [];
    arr.push(all_data(db, query));
    Promise.all(arr)
        .then(results => {
            //console.log(results);
            //console.log(1);
            //console.log(results[0].length, results[0]);
            //return results;
            
            console.log(results[0].length);
            for (let i = 0; i < results[0].length; i++) {
                //let new_field = new Field(ctx, i + 1, 4);
                //new_field.draw(ctx);
                console.log( i + 1, 4);   
            }
        })
        .catch(err => console.log(err));
       
    function all_data(db, query) {
        return new Promise((res, rej) => {
            db.all(query, (err, row) => {
                res(row);
                //console.log(2);
            });

        });
    }

}show_data();

