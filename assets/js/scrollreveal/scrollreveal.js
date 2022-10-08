/*===== scroll reveal animation =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home-name`, {delay: 500})
sr.reveal(`.home-education`, {delay: 600})
sr.reveal(`.home-social`, {interval: 100, delay: 700})
sr.reveal(`.scroll-down`, {delay: 800})