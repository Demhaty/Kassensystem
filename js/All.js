const cvs = document.getElementById('canvas1');
const ctx = cvs.getContext('2d');
/// Grid draw

let grid = new Grid(ctx, 4);
grid.draw(ctx);


//
let field2 = new Field(ctx, 5, 4);
field2.draw(ctx);
let field3 = new Field(ctx, 6, 4);
field3.draw(ctx);