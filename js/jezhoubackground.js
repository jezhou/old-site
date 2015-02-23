var t = new Trianglify({
  cellsize: 50,
  x_gradient: Trianglify.colorbrewer.Reds[9],
  y_gradient: Trianglify.colorbrewer.Reds[9],
});
var pattern = t.generate(250, document.getElementById("sidebar-wrapper").clientHeight);

document.getElementById("sidebar-wrapper").setAttribute('style', 'background-image: '+pattern.dataUrl);

var s = new Trianglify({
  cellsize: 10,
  x_gradient: Trianglify.colorbrewer.Reds[3],
  y_gradient: Trianglify.colorbrewer.Reds[3],
});
var patterns = s.generate(document.getElementById("menu-toggle").clientWidth, document.getElementById("menu-toggle").clientHeight + 20);

document.getElementById("menu-toggle").setAttribute('style', 'background-image: '+patterns.dataUrl);
