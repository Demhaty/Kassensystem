// Datenbank
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Kassensystem.db');

// Kategorie
db.run('CREATE TABLE IF NOT EXISTS Kategorie ( Kategorie_id INTEGER PRIMARY KEY, Kategorie_name TEXT)');
// Mitarbeiter
db.run('CREATE TABLE IF NOT EXISTS Mitarbeiter ( Mitarbeiter_id INTEGER PRIMARY KEY, Mitarbeiter_name TEXT, Kennnummer TEXT)');
// Produkt
db.run('CREATE TABLE IF NOT EXISTS Produkt ( Produkt_id INTEGER PRIMARY KEY, Produkt_name TEXT, preis INTEGER , Kategorie_fk_id INTEGER NOT NULL, FOREIGN KEY(Kategorie_fk_id) REFERENCES Kategorie(Kategorie_id)  ON UPDATE CASCADE)');
// Berechnung
db.run('CREATE TABLE IF NOT EXISTS Berechnung ( Berechnung_id INTEGER PRIMARY KEY, Datum TEXT, Mitarbeiter_fk_id INTEGER NOT NULL, FOREIGN KEY(Mitarbeiter_fk_id) REFERENCES Mitarbeiter(Mitarbeiter_id)  ON UPDATE CASCADE)');
// Berechnungsposition
db.run('CREATE TABLE IF NOT EXISTS Berechnungsposition ( Berechnungsposition_id INTEGER PRIMARY KEY, Berechnung_fk_id INTEGER NOT NULL, Produkt_fk_id INTEGER NOT NULL, Anzahl INTEGER, Preis INTEGER, FOREIGN KEY(Berechnung_fk_id) REFERENCES Berechnung(Berechnung_id)  ON UPDATE CASCADE, FOREIGN KEY(Produkt_fk_id) REFERENCES Produkt(Produkt_id)  ON UPDATE CASCADE)');



db.close();

/*

function insert_table(str) {

}
*/