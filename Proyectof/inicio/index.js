document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slide-img");
  const imagenes = [
    "../inicio/Resources/slide1.png",
    "../inicio/Resources/slide2.png",
    "../inicio/Resources/slide3.png"
  ];
  let i = 0;

  setInterval(() => {
    i = (i + 1) % imagenes.length;
    slider.src = imagenes[i];
  }, 3000);
});
