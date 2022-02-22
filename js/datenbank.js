// Datenbank
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Kassensystem.db');

// Kategorie
db.run('CREATE TABLE IF NOT EXISTS Kategorie ( Kategorie_id INTEGER PRIMARY KEY AUTOINCREMENT, Kategorie_name TEXT)');
// Mitarbeiter
db.run('CREATE TABLE IF NOT EXISTS Mitarbeiter ( Mitarbeiter_id INTEGER PRIMARY KEY AUTOINCREMENT, Mitarbeiter_name TEXT, Kennnummer TEXT)');
// Produkt
db.run('CREATE TABLE IF NOT EXISTS Produkt ( Produkt_id INTEGER PRIMARY KEY AUTOINCREMENT, Produkt_name TEXT, preis INTEGER , Kategorie_fk_id INTEGER NOT NULL, FOREIGN KEY(Kategorie_fk_id) REFERENCES Kategorie(Kategorie_id)  ON UPDATE CASCADE)');
// Berechnung
db.run('CREATE TABLE IF NOT EXISTS Berechnung ( Berechnung_id INTEGER PRIMARY KEY AUTOINCREMENT, Datum TEXT, Mitarbeiter_fk_id INTEGER NOT NULL, FOREIGN KEY(Mitarbeiter_fk_id) REFERENCES Mitarbeiter(Mitarbeiter_id)  ON UPDATE CASCADE)');
// Berechnungsposition
db.run('CREATE TABLE IF NOT EXISTS Berechnungsposition ( Berechnungsposition_id INTEGER PRIMARY KEY AUTOINCREMENT, Berechnung_fk_id INTEGER NOT NULL, Produkt_fk_id INTEGER NOT NULL, Anzahl INTEGER, Preis INTEGER, FOREIGN KEY(Berechnung_fk_id) REFERENCES Berechnung(Berechnung_id)  ON UPDATE CASCADE, FOREIGN KEY(Produkt_fk_id) REFERENCES Produkt(Produkt_id)  ON UPDATE CASCADE)');






let Kategorie_v = [{
    "Kategorie_name": "Epoxy Flooring"
}, {
    "Kategorie_name": "Prefabricated Aluminum Metal Canopies"
}, {
    "Kategorie_name": "Masonry & Precast"
}, {
    "Kategorie_name": "Prefabricated Aluminum Metal Canopies"
}, {
    "Kategorie_name": "Drywall & Acoustical (FED)"
}];
//
//db.run(`INSERT INTO Kategorie( Kategorie_name ) VALUES('${Kategorie_v[0].Kategorie_name}'), ('${Kategorie_v[1].Kategorie_name}'), ('${Kategorie_v[2].Kategorie_name}')`);


let Produkt_v = [{
    "Produkt_name": "Island Oasis - Mango Daiquiri",
    "preis": 92
}, {
    "Produkt_name": "Fib N9 - Prague Powder",
    "preis": 85
}, {
    "Produkt_name": "Sauce - Soy Low Sodium - 3.87l",
    "preis": 11
}, {
    "Produkt_name": "Olives - Green, Pitted",
    "preis": 96
}, {
    "Produkt_name": "Shichimi Togarashi Peppeers",
    "preis": 93
}];
//
//db.run(`INSERT INTO Produkt( Produkt_name,preis,Kategorie_fk_id ) VALUES('${Produkt_v[0].Produkt_name}' , ${Produkt_v[0].preis} , 3),('${Produkt_v[1].Produkt_name}' , ${Produkt_v[1].preis} ,1),('${Produkt_v[2].Produkt_name}' , ${Produkt_v[2].preis} , 2)`);

db.close();