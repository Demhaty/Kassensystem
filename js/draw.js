//
const cvs = document.getElementById('canvas1');
const ctx = cvs.getContext('2d');
let arr_filed = [];
let arr_produkt = [];
let arr_kategorie = [];
let arr_produkt_gewalt = [];
let arr_number=[];


var Grid = function(cvs, number_of_fields ){
	this.cvs = cvs;
	this.ctx = this.cvs.getContext('2d');
	this.number_of_fields = number_of_fields;
	
	
	this.field_width = this.cvs.width / number_of_fields;
	this.field_height = this.cvs.height / number_of_fields;
	
}
Grid.prototype.drawGrid = function(){
	
	
  this.ctx.clearRect( 0,0,this.cvs.width, this.cvs.height);
  //this.ctx.fillStyle='#ffffff';
  //this.ctx.fillRect( 0, 0, this.cvs.width, this.cvs.height);
  this.ctx.beginPath();
  this.ctx.lineWidth=1;
  
  for( let y = 0; y <= this.cvs.height; y += this.field_height) {
	this.ctx.moveTo( 0, y );
	this.ctx.lineTo( this.cvs.width-this.field_width, y );
  }

  for( let x = 0; x <= this.cvs.width; x += this.field_width) {
	this.ctx.moveTo( x, 0 );
	this.ctx.lineTo( x, this.cvs.height);
  }  
  
  this.ctx.stroke();
}


Grid.prototype.drawFieldNumbers = function( ) {
    
	for( let y = 0; y  < this.cvs.height-this.field_height; y += this.field_height ) {
		for( let x = 0; x < this.cvs.width-this.field_width; x += this.field_width) {
			let fieldnumber = ( (parseInt(y/this.field_height) * this.number_of_fields) + parseInt(x / this.field_width)) ;
            //if(fieldnumber == )
			let measure = this.ctx.measureText( fieldnumber );	
			let text_width = measure.width;	
            this.ctx.font="20px Arial";
            this.ctx.fontStyle='#3e3e3e';
			this.ctx.fillText( fieldnumber, x +(this.field_width/2) - (text_width/2) , y + 35);
		}
	}
}
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
    ctx.fillRect((postion.x) * this.width, (postion.y) * this.height, this.width - 10, this.height - 10);
    //ctx.font = "30px Arial";
    //ctx.fillText("Hello World", 10, 50);
    ctx.font = "13px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(this.text, (postion.x) * this.width + 5, (postion.y) * this.height + (this.height / 2));

}
Field.prototype.getcoordinateFromId = function() {
    return {
        x: this.id % this.num_fields,
        y: parseInt(this.id / this.num_fields)
    }
}



//
console.log(data, data.length);

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
let Kategorie_text='';
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
            let text = arr_filed[fieldnumber].text;Kategorie_text=text;
            arr_filed = [];
            let arr = [];
            arr.push(req_server(text));

            Promise.allSettled(arr)
                .then(v => {
                    console.log(v);
                    arr_produkt.push(v[0].value);
                    draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);
                })

            .catch(err => console.error(err));
        }
     else if (arr_produkt[0].length != 0) {

        arr_produkt_gewalt.push({ Kategorie: Kategorie_text, value: arr_produkt[0][fieldnumber] });
        draw_canvas23(arr_produkt_gewalt);
        
    }  
}else if(fieldnumber == 15){
    
        arr_produkt = [];arr_filed=[];
        draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);
    
}   
}
//
/*
function mouseMove(evt) {
    document.getElementById('canvas1').addEventListener("mousedown", () => {
        let x = evt.offsetX;
        let y = evt.offsetY;

        let xpos = parseInt(x / 200);
        let ypos = parseInt(y / 150);
        let fieldnumber = ypos * 4 + xpos;
        if (arr_filed.filter(v => (v.id) == fieldnumber).length > 0) {

            console.log(fieldnumber);

            //let x = req_server(arr_filed[fieldnumber].text);
            if (arr_produkt.length == 0) {
                let text = arr_filed[fieldnumber].text;
                arr_filed = [];
                let arr = [];
                arr.push(req_server(text));

                Promise.allSettled(arr)
                    .then(v => {
                        console.log(v);
                        arr_produkt.push(v[0].value);
                        draw_canvas(data, ctx, arr_filed, arr_produkt, arr_kategorie);
                    })

                .catch(err => console.error(err));
            } else if (arr_produkt.length != 0) {

                arr_produkt_gewalt.push(arr_produkt[0][fieldnumber]);
                //arr_produkt = [];
            }

        } else {
            document.title = '0:0:0';
            fieldnumber = undefined;
        }

        //fieldnumber = null;
    });
}
*/
//
//
function req_server(Gategorie) {
    return new Promise((res, rej) => {
        //var dataX = null;
        const client = new XMLHttpRequest();

        client.onload = function() {
            console.log("client.onload")
            if (client.readyState === client.DONE) {
                console.log("client.DONE")
                if (client.status === 200) {
                    console.log("status == 200")
                    console.log(client.response);
                    console.log(client.responseText);
                    var dataX = JSON.parse(client.responseText);
                    console.log(dataX);

                    res(dataX);
                    //arr_produkt = dataX;
                    //return dataX;
                }
            }
        };


        client.open('POST', 'http://127.0.0.1:8001/setData', true);
        client.responseType = 'text';


        client.send(JSON.stringify({
            value: Gategorie
        }));
    });
}

cvs.onmousedown = mouseclick;


//
//  canvas2 
//
//  redundant code 
//  ==> ||

function draw_canvas23(arr_produkte){
    let sum = 0;
    let cvs2 = document.getElementById('canvas2')
    let ctx2 = cvs2.getContext('2d');
    ctx2.clearRect(0, 0, cvs2.width, cvs2.height);  
    for(let i=0,y=20,x=10;i<arr_produkte.length;i++,y+=50){
        sum += arr_produkte[i].value.preis;
        ctx2.font = "18px Arial";
        ctx2.fillStyle = "#FA0501";
        ctx2.fillText(`Kategorie: ${arr_produkte[i].Kategorie}`,x, y);
        ctx2.font = "12px Arial";
        ctx2.fillStyle = "#000000";
        ctx2.fillText(`Produkt: ${arr_produkte[i].value.Produkt_name}:  ${arr_produkte[i].value.preis}$`, x+40, y+20);
          
    }
    let cvs3 = document.getElementById('canvas3')
    let ctx3 = cvs3.getContext('2d');
    ctx3.clearRect(0, 0, cvs3.width, cvs3.height);
    ctx3.font = "24px Arial";
    ctx3.fillStyle = "#ffffff";
    ctx3.fillText(`gesamt : ${sum}`,cvs3.width/3,cvs3.height/2);

}

//
//  canvas 4
//
function draw_canvas4(){
    let cvs4 = document.getElementById('canvas4');
    let ctx4 = cvs4.getContext('2d');
    //let number = new Field(ctx4,1,4,1);number.draw(ctx4);
    //for(let i=0;i<=9;i++){
        //let number = new Field(ctx4,1,4,9);number.draw(ctx4);
    //}
    let arr= [
        [7,8,9],
        [4,5,6],
        [1,2,3],
        [0,'X']
    ];
    // 4 , 8 , 12
    // i=0 , k=1=> 3 / i=1 , k=5 =>7 / i=2 ,k=9=> 11 /
    let k=1;
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++,k++){
            if(k==4 || k==8 || k==12){j--;continue;}
                
                let number = new Field(ctx4,k,4,arr[i][j]);number.draw(ctx4);
            
        }
    }
    //  x:100 , y:75 fillRect
    
}
draw_canvas4();

