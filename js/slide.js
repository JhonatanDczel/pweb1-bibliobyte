const prev = document.querySelector(".prev");
const slide = document.querySelector(".slide");
const next = document.querySelector(".next");

prev.addEventListener("click", () => {
  slide.scrollLeft -= 300;
});

next.addEventListener("click", () => {
  slide.scrollLeft += 300;
});

const obtenerLibros = async function () {
  try {
    const response = await fetch("http://localhost:4500/obtener-imagenes");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener imágenes: ", error);
    throw error;
  }
};

let libros;

const cargarLibros = async function () {
  try {
    libros = await obtenerLibros();

    libros.forEach((libro) => {
      let portada = document.createElement("img");
      portada.src = "./images_libros/" + libro.rutaDePortada;

      let description = document.createElement("p");
      description.textContent = libro.descripcion;

      let background = document.createElement("div");
      background.classList.add("background");
      background.appendChild(portada);
      background.appendChild(description);

      let container = document.createElement("div");
      container.classList.add("container");
      container.style.backgroundImage = "url('./images_libros/" + libro.rutaDePortada + "')";
      container.style.backgroundSize = "cover";
      container.appendChild(background);

      slide.appendChild(container);
    });
  } catch (error) {
    console.error("Error al cargar libros: ", error);
  }
};

const iniciar = async function () {
  await cargarLibros();

  const cartelera = document.querySelector(".cartelera");

  for (let i = 0; i < 6; i++) {
    const img = document.createElement("img");
    let num = Math.floor(Math.random() * libros.length);
    img.src = "./images_libros/" + libros[num].rutaDePortada;
    cartelera.appendChild(img);
  }
};

iniciar();