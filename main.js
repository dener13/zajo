document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 60000, // Define o tempo de atraso em milissegundos (3 segundos)
            disableOnInteraction: false, // Continua o autoplay após interação do usuário
        },
    });
});
