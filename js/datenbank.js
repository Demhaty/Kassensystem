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
db.run('CREATE TABLE IF NOT EXISTS Berechnung ( Berechnung_id INTEGER PRIMARY KEY AUTOINCREMENT, Datum TEXT)');
// Berechnungsposition

db.run('CREATE TABLE IF NOT EXISTS Berechnungsposition ( Berechnungsposition_id INTEGER PRIMARY KEY AUTOINCREMENT, Berechnung_fk_id INTEGER NOT NULL, Produkt_fk_id INTEGER NOT NULL, Anzahl INTEGER, Preis INTEGER, FOREIGN KEY(Berechnung_fk_id) REFERENCES Berechnung(Berechnung_id)  ON UPDATE CASCADE, FOREIGN KEY(Produkt_fk_id) REFERENCES Produkt(Produkt_id)  ON UPDATE CASCADE)');


//////////
let Produkt1 = [{  "Produkt_name": "Banana", "preis": 12 , "Kategorie_fk_id": 1},
    {  "Produkt_name": "Apple", "preis": 13 , "Kategorie_fk_id": 1}, 
    {  "Produkt_name": "Peach", "preis": 15 , "Kategorie_fk_id": 1},
    {  "Produkt_name": "Strawberry", "preis": 13 , "Kategorie_fk_id": 1},
    {  "Produkt_name": "Tomato", "preis": 16 , "Kategorie_fk_id": 1},
    {  "Produkt_name": "Cherry", "preis": 10 , "Kategorie_fk_id": 1}];
//////////
let Produkt2 = [{ "Produkt_name": "Tomate", "preis": 12 , "Kategorie_fk_id": 2},
    {  "Produkt_name": "Fenchel", "preis": 13 , "Kategorie_fk_id": 2} ,
    {  "Produkt_name": "Zucchini", "preis": 15 , "Kategorie_fk_id": 2},
    {  "Produkt_name": "Pabrika", "preis": 13 , "Kategorie_fk_id": 2},
    {  "Produkt_name": "Gurke", "preis": 16 , "Kategorie_fk_id": 2},
    {  "Produkt_name": "Kartoffel", "preis": 10 , "Kategorie_fk_id": 2}];
///////////
let Produkt3 = [{ "Produkt_name": "Vodka", "preis": 22 , "Kategorie_fk_id": 3},
    {  "Produkt_name": "Bier", "preis": 23 , "Kategorie_fk_id": 3} ,
    {  "Produkt_name": "whisky", "preis": 25 , "Kategorie_fk_id": 3}];
///////////
let Produkt4 = [{ "Produkt_name": "Chips", "preis": 3 , "Kategorie_fk_id": 4},
    {  "Produkt_name": "Nic Nac's", "preis": 6 , "Kategorie_fk_id": 4},
    {  "Produkt_name": " Milka", "preis": 4 , "Kategorie_fk_id": 4},
    {  "Produkt_name": " Erdnüsse", "preis": 3 , "Kategorie_fk_id": 4}];
//////////
let Produkt5 = [{"Produkt_name": "Coca-Cola", "preis": 3 , "Kategorie_fk_id": 5},
    { "Produkt_name": "Saft", "preis": 6 , "Kategorie_fk_id": 5},
    { "Produkt_name": " Club-Mate", "preis": 4 , "Kategorie_fk_id": 5},
    { "Produkt_name": " Red Bull", "preis": 3 , "Kategorie_fk_id": 5}];
/////////
let Produkt6 = [{"Produkt_name": "Galbani Gorgonzola", "preis": 6 , "Kategorie_fk_id": 6},
    {"Produkt_name": " Herta Finesse", "preis": 4 , "Kategorie_fk_id": 6},
    {"Produkt_name": " Hochland Almette", "preis": 3 , "Kategorie_fk_id": 6}];
//////////
let arr =[{"Obst" : Produkt1}, {"Gemüse": Produkt2}, {"Alkohol Getränke":Produkt3}, {"Süßes & Salziges":Produkt4}, {"Alkoholfreie Getränke":Produkt5}, {"Frische & Convenience":Produkt6} ];
/////
/////    Insert
/*
for(let i =0;i<arr.length;i++){
    db.run(`INSERT INTO Kategorie( Kategorie_name ) VALUES('${Object.keys(arr[i])[0]}')`);// valuee= Object.keys(arr[i])[0];
    for(let j=0;j<arr[i][Object.keys(arr[i])[0]].length;j++){
        db.run(`INSERT INTO Produkt( Produkt_name,preis,Kategorie_fk_id ) VALUES("${arr[i][Object.keys(arr[i])[0]][j].Produkt_name}",${arr[i][Object.keys(arr[i])[0]][j].preis},${arr[i][Object.keys(arr[i])[0]][j].Kategorie_fk_id})`);

    }
}
*/
db.close();












































