let swiperClans = new Swiper(".clans-container", {
    loop: true,
    spaceBetween: 24,
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
})