var t = new Trianglify({
  cellsize: 30,
  x_gradient: Trianglify.colorbrewer.Reds[3],
  y_gradient: Trianglify.colorbrewer.Reds[4],
});
var pattern = t.generate(250, document.getElementById("sidebar-wrapper").clientHeight);
document.getElementById("sidebar-wrapper").setAttribute('style', 'background-image: '+pattern.dataUrl);
