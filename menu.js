const arrow = document.querySelector('.header-icono');
const header = document.querySelector('.header-botones');

arrow.addEventListener('click', ()=>{
    arrow.classList.toggle('active');
    header.classList.toggle('active');
})