const postImagen = document.querySelector("#post-pelicula");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");

let pagina = 1;

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});
btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6095d2e844434c39761dc6eed1a12b8b&language=es-ES&page=${pagina}`);
        // si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas_Html = "";

            datos.results.forEach((pelicula) => {
                peliculas_Html += `
                <section class="post" data-title="${pelicula.title}" style="background-image: url(https://image.tmdb.org/t/p/w500/${pelicula.poster_path});"> 
                
                    <div class="tarjeta">
                        <div class="tarjeta-close"><i class='bx bx-x-circle tarjeta-close__i'></i></div>
                        <h2 class="tarjeta-title">${pelicula.title}</h2>
                        <img class="tarjeta__imagen" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="imagen de ${pelicula.title}" />
                        <div class="tarjeta-boton">
                            <div class="tarjeta-boton__meGusta"><div class="tarjeta-boton__icon"><i class='bx bx-heart'></i><i class='bx bxs-heart'></i></div> ${pelicula.vote_count}</div>
                            <button class="tarjeta-boton__boton"><i class='bx bx-purchase-tag-alt tarjeta-boton__i'></i>Comprar</button>

                            <button class="tarjeta-boton__boton ver-mas"><i class='bx bx-plus tarjeta-boton__i'></i>
                                Ver Detalles
                                <div class="post-detalle">
                                    <div class="post-close"><i class='bx bx-x-circle post-close__i'></i></div>
                                    <h2 class="post-detalle__title">${pelicula.title}</h2>
                                    <p class="post-detalle__parrafo">${pelicula.overview}</p>
                                    <div class="post-info"> 
                                        <div class="post-tiempo">
                                            <p class="post-tiempo__fecha">${pelicula.release_date}</p>
                                            <p class="post-tiempo__fecha"> | Idioma:</p>
                                            <p class="post-tiempo__idioma">${pelicula.original_language}</p>
                                        </div>
                                        <div>
                                            <i class='bx bxs-star'></i>
                                            <i class='bx bxs-star'></i>
                                            <i class='bx bxs-star'></i>
                                            <i class='bx bx-star' ></i>
                                            <i class='bx bx-star' ></i>
                                        <span>${pelicula.vote_average}</span></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
            `;
            });
            postImagen.innerHTML = peliculas_Html;

            const post = document.querySelectorAll(".post");
            const verMas = document.querySelectorAll(".ver-mas");

            post.forEach((uno) => {
                uno.addEventListener("click", (e) => {
                    uno.classList.add("active");
                    if (e.target && e.target.tagName === "I") {
                        if (e.target.classList.contains("tarjeta-close__i")) {
                            uno.classList.remove("active");
                        }
                    }
                });
            });
            verMas.forEach((item) => {
                item.addEventListener("click", (e) => {
                    item.classList.add("active");
                    if (e.target && e.target.tagName === "I") {
                        if (e.target.classList.contains("post-close__i")) {
                            item.classList.remove("active");
                        }
                    }
                });
            });
            
            const iconoHeart = document.querySelectorAll('.tarjeta-boton__icon');
            iconoHeart.forEach(icono => {
                icono.addEventListener('click', ()=>{
                    icono.classList.toggle('active');
                })
            });
        } else if (respuesta.status === 401) {
            console.log("llave de la Api Fallida");
        } else if (respuesta.status === 404) {
            console.log("La pelicula que buscas no existe");
        } else {
            console.log("Hubo un error en la Api y no sabemos que paso");
        }
    } catch (error) {
        console.log(error);
    }
};
cargarPeliculas();