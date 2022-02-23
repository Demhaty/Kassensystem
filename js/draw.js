//
const cvs = document.getElementById('canvas1');
const ctx = cvs.getContext('2d');
let arr_filed = [];
var Grid = function(ctx, num_fields) {
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.num_fields = num_fields;

}
Grid.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.clearRect(0, 0, this.width, this.height);

    for (let x = 0; x <= this.width; x += this.width / this.num_fields) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
    }
    for (let y = 0; y <= this.height; y += this.height / this.num_fields) {
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
    }

    ctx.stroke();
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
function draw_canvas(data, ctx, arr, count) {
    // draw Kategorie
    if (count == 1) {
        for (let i = 0; i < data.length; i++) {
            let new_field = new Field(ctx, data[i].Kategorie_id, 4, data[i].Kategorie_name);
            arr.push(new_field);
            new_field.draw(ctx);
        }
    }
    // draw Produkt 
    else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
draw_canvas(data, ctx, arr_filed, 1);


// um Wissen welche Field ist
let fieldnumber = 0;

function mouseMove(evt) {


    let x = evt.offsetX;
    let y = evt.offsetY;

    let xpos = parseInt(x / arr_filed[0].width);
    let ypos = parseInt(y / arr_filed[0].height);

    fieldnumber = ypos * 4 + xpos;

    //if (arr_filed.filter(v => v.id == fieldnumber).length > 0) {
    document.title = xpos + ":" + ypos + ":" + fieldnumber;
    document.getElementById('canvas1').addEventListener("mousedown", () => {
        if (arr_filed.filter(v => v.id == fieldnumber).length > 0) {
            console.log(fieldnumber);
            draw_canvas(data, ctx, arr_filed, 0);
        } else {
            document.title = '0:0:0';
            //fieldnumber = null;
        }
        //fieldnumber = null;
    });



}


cvs.onmousemove = mouseMove;