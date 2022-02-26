

//
let cvs = document.getElementById('canvas1');
let ctx = cvs.getContext('2d');
let cvs4 = document.getElementById('canvas4');
let ctx4 = cvs4.getContext('2d');
let cvs5 = document.getElementById('canvas5');
let ctx5 = cvs5.getContext('2d');
let cvs2 = document.getElementById('canvas2')
let ctx2 = cvs2.getContext('2d');
let arr_filed = [];
let arr_produkt = [];
let arr_kategorie = [];
let arr_produkt_gewalt = [];
let arr_number = [];
let str = [];
let rechnung=[];


    //
    // Produkte zu zeigen
    // Field Objekt um einzelnen Filed zu zeichnen 
var Field = function(ctx, id, number_fields, text) {
    this.id = id - 1;
    this.num_fields = number_fields;
    this.width = (ctx.canvas.width / number_fields);
    this.height = (ctx.canvas.height / number_fields);
    this.text = text;
    this.filed_img = null;
}

Field.prototype.draw = function(ctx) {
    let postion = this.getcoordinateFromId();
    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = "#3e3e3e";
    //ctx.fillRect((this.id - 1) * this.width, (this.id - 2) * this.height, this.width, this.height);
    ctx.fillRect((postion.x) * this.width, (postion.y) * this.height, this.width - 2.5, this.height - 2.5);
    //ctx.font = "30px Arial";
    //ctx.fillText("Hello World", 10, 50);
    ctx.font = "13px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(this.text, (postion.x) * this.width +this.width/5, (postion.y) * this.height + (this.height / 2));

}
Field.prototype.getcoordinateFromId = function() {
    return {
        x: this.id % this.num_fields,
        y: parseInt(this.id / this.num_fields)
    }
}



//
//console.log(data, data.length);

//

//
// canvas_draw 
function draw_canvas(data, ctx, arr_field, arr1, arr2) {
    // draw Kategorie
    if (arr1.length == 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < data.length; i++) {
            let new_field = new Field(ctx, data[i].Kategorie_id, 4, data[i].Kategorie_name);
            arr_field.push(new_field);
            new_field.draw(ctx);
            //arr2 = data;
        }

    }
    // draw Produkt 
    else {
        //arr_field = [];
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < arr1[0].length; i++) {
            let new_field = new Field(ctx, i + 1, 4, arr1[0][i].Produkt_name);
            arr_field.push(new_field);
            new_field.draw(ctx);
        }
        let new_field = new Field(ctx, 16, 4, "<<<<<Back");
        new_field.draw(ctx);

    }
}
//
//
draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);


// um Wissen welche Field ist

//
//
//
let Kategorie_text = '';

function mouseclick(evt) {

    
    let x = evt.offsetX;
    let y = evt.offsetY;

    let xpos = parseInt(x / 200);
    let ypos = parseInt(y / 150);

    let fieldnumber = ypos * 4 + xpos;

    if (arr_filed.filter(v => (v.id) == fieldnumber).length > 0) {
        console.log(fieldnumber);
        document.title = xpos + ":" + ypos + ":" + fieldnumber;

        if (arr_produkt.length == 0) {
            let text = arr_filed[fieldnumber].text;
            Kategorie_text = text;
            arr_filed = [];
            let arr = [];
            let xx ='setData';
            arr.push(req_server(text,xx));

            Promise.allSettled(arr)
                .then(v => {
                    console.log(v);
                    arr_produkt.push(v[0].value);
                    draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);
                })

            .catch(err => console.error(err));
        } else if (arr_produkt[0].length != 0) {
            if (arr_produkt_gewalt.filter((v, i) => v.value.Produkt_name == arr_produkt[0][fieldnumber].Produkt_name).length == 0) { arr_produkt_gewalt.push({ Kategorie: Kategorie_text, value: arr_produkt[0][fieldnumber], anzahl: 1 }); } else {
                arr_produkt_gewalt.filter((v) => v.value.Produkt_name == arr_produkt[0][fieldnumber].Produkt_name)[0].anzahl += 1;
            }
            draw_canvas23(arr_produkt_gewalt);

        }
    } else if (fieldnumber == 15) {

        arr_produkt = [];
        arr_filed = [];
        draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);

    }

}

function mouseclick2(evt) {

    
    let x = evt.offsetX;
    let y = evt.offsetY;

    let xpos = parseInt(x / 100);
    let ypos = parseInt(y / 75);

    let fieldnumber = ypos * 4 + xpos;
 
    if (arr_number.filter((v) => (v.id) == fieldnumber).length > 0) {
       
        console.log(fieldnumber);
        
        document.title = xpos + ":" + ypos + ":" + fieldnumber;
        console.log(arr_number.filter((v) => (v.id == fieldnumber))[0]);
        str.push(arr_number.filter((v) => (v.id == fieldnumber))[0]);
   

        if (str[str.length - 1].text == "C") { str = []; } else if (str[str.length - 1].text == "OK") { str.pop();draw_canvas5(str,true); } // Datenbank abfrage=====>>>>>>
        else if (str[str.length - 1].text == "Storno") {
            str = [];
            arr_produkt_gewalt = [];
            draw_canvas23(arr_produkt_gewalt);
            

        }
        draw_canvas5(str,false);


    }
}
//
//
function req_server(Gategorie,xx) {
    return new Promise((res, rej) => {       
        const client = new XMLHttpRequest();
        client.onload = function() {         
            if (client.readyState === client.DONE) {        
                if (client.status === 200) {             
                    var dataX = JSON.parse(client.responseText);
                    res(dataX);                 
                }
            }
        };
        client.open('POST', 'http://127.0.0.1:8001/'+xx, true);
        client.responseType = 'text';
        client.send(JSON.stringify({
            value : Gategorie
        }));
    });
}

cvs.onmousedown = mouseclick;
cvs4.onmousedown = mouseclick2;

//
//  canvas2 ,3
//
function draw_canvas23(arr_produkte) {
    let sum = 0;
    ctx2.clearRect(0, 0, cvs2.width, cvs2.height);
    for (let i = 0, y = 20, x = 10; i < arr_produkte.length; i++, y += 50) {
        sum += arr_produkte[i].value.preis*arr_produkte[i].anzahl;
        ctx2.font = "18px Arial";
        ctx2.fillStyle = "#FA0501";
        ctx2.fillText(`Kategorie: ${arr_produkte[i].Kategorie}`, x, y);
        ctx2.font = "12px Arial";
        ctx2.fillStyle = "#000000";
        ctx2.fillText(`${arr_produkte[i].anzahl}X  Produkt: ${arr_produkte[i].value.Produkt_name}:  ${arr_produkte[i].value.preis}$`, x + 40, y + 20);
    }
    let cvs3 = document.getElementById('canvas3')
    let ctx3 = cvs3.getContext('2d');
    ctx3.clearRect(0, 0, cvs3.width, cvs3.height);
    ctx3.font = "24px Arial";
    ctx3.fillStyle = "#ffffff";
    ctx3.fillText(`Summe : ${sum}$`, cvs3.width / 3, cvs3.height / 2);
}
//
//  canvas 4
//
function draw_canvas4() {
    arr_number = [];
    let arr = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0, '.', 'C']
    ];
    //let arr_enter = [3, 7, 11, 15];
    // 4 , 8 , 12
    // i=0 , k=1=> 3 / i=1 , k=5 =>7 / i=2 ,k=9=> 11 /
    let k = 1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++, k++) {
            if (k == 4 || k == 8 || k == 12) { j--; continue; }

            let number = new Field(ctx4, k, 4, arr[i][j]);
            number.draw(ctx4);
            arr_number.push(number);
        }
    }
    //  x:100 , y:75 fillRect
    // arr[OK:3,7 , STorno:11,15]
    // ok,storno: width:100 , height:150
    //
    //
    //
    arr_number.push({ id: 3, number_fields: 4, width: 100, height: 75 * 2, text: 'OK' });
    arr_number.push({ id: 7, number_fields: 4, width: 100, height: 75 * 2, text: 'OK' });
    arr_number.push({ id: 11, number_fields: 4, width: 100, height: 75 * 2, text: 'Storno' });
    arr_number.push({ id: 15, number_fields: 4, width: 100, height: 75 * 2, text: 'Storno' });
    arr_number.sort((a, b) => a.id - b.id);
    ctx4.fillStyle = "#3e3e3e";
    ctx4.fillRect(cvs4.width - arr_number[0].width, 0, cvs4.width, (cvs4.height - arr_filed[0].height) - 5);
    ctx4.fillRect(cvs4.width - arr_number[0].width, arr_number[12].height * 2, cvs4.width, (cvs4.height - arr_filed[0].height));
    ctx4.fillStyle = "#00FF22";
    ctx4.font = '30px Arial';
    ctx4.fillText(`OK`, cvs4.width - arr_number[12].width + arr_number[12].width / 5, arr_number[12].height);
    ctx4.fillStyle = "#FF0000";
    ctx4.fillText(`Storno`, cvs4.width - arr_number[13].width - 5 + arr_number[13].width / 10, cvs4.height - (arr_number[13].height));

}
draw_canvas4();
//
function draw_canvas5(arr,count) {
    let x = 75;  
    ctx5.fillStyle = "#3e3e3e";
    ctx5.fillRect(0, cvs5.height - x, cvs5.width, cvs5.height);
    let strr = '';
    if (arr.length == 0) { strr = 0; } else
            strr = '';
        arr.forEach((v) => {
            strr += v.text;
        });
     if(count){
        //
        
        let sum =0;
        arr_produkt_gewalt.forEach((v)=>{
            sum += v.value.preis * v.anzahl;
        });console.log(sum,strr,'gesamt : ',(strr-0) - sum);  
    
            if(((strr-0) >= sum)&&  sum !=0){
                let date = new Date();date=date+"";date=date.slice(0,24);
                rechnung.push({Berechnung_fk_id:rechnung.length, Produkt : arr_produkt_gewalt ,Summe : sum , eingegebene_Geld : (strr-0),datum:date});
            
            console.log(rechnung); zz=req_server(rechnung[rechnung.length-1],'setData2');
            
            let txt = `eingegebene Geld : ${strr}$\nSumme : ${sum}$\nZuruckgabe: ${(strr-0)-sum}$`;
            let lines = txt.split('\n');
            ctx5.clearRect(0, 0, cvs5.width, cvs5.height-x);
            for(let i=0,x=10,y=30;i<lines.length;i++,y+=30){
                ctx5.fillStyle = "#3e3e3e";
                ctx5.font = '20px Arial';
               ctx5.fillText(lines[i],x,y);
            }setTimeout(() => {  ctx5.clearRect(0, 0, cvs5.width, cvs5.height-x);ctx2.clearRect(0, 0, cvs2.width, cvs2.height); }, 5000);
            str=[];strr='';arr_produkt_gewalt=[];
            }else if(sum==0){alert(" ERROR  -_-");}
            else {alert("eingegebene Geld reicht nicht,um die Produkte zu kaufen -_-");}
        }
    ctx5.fillStyle = "#ffffff";
    ctx5.font = '30px Arial';
    ctx5.fillText(strr, x / 2, cvs5.height - x / 4);
}
draw_canvas5([],false);
 
