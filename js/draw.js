//

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
var Field = function(ctx, id, number_fields) {
    this.id = id - 1;
    this.num_fields = number_fields;
    this.width = (ctx.canvas.width / number_fields);
    this.height = (ctx.canvas.height / number_fields);
    this.filed_img = null;
}

Field.prototype.draw = function(ctx) {
    let postion = this.getcoordinateFromId();
    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = "#3e3e3e";
    //ctx.fillRect((this.id - 1) * this.width, (this.id - 2) * this.height, this.width, this.height);
    ctx.fillRect((postion.x) * this.width, (postion.y) * this.height, this.width - 10, this.height - 10);

}
Field.prototype.getcoordinateFromId = function() {
    return {
        x: this.id % this.num_fields,
        y: parseInt(this.id / this.num_fields)
    }
}