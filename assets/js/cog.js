/* toggle cog */
const styleSwitcherToggle = document.querySelector(".cog-toggler")
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".cog").classList.toggle("open")
});

// hide cog on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".cog").classList.contains("open")) {
        document.querySelector(".cog").classList.remove("open")
    }
});

/* theme light and dark mode */
const dayNight = document.querySelector(".day-night")
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("bxs-sun")
    dayNight.querySelector("i").classList.toggle("bxs-moon")
    document.body.classList.toggle("light")
});

window.addEventListener("load", () => {
    if(document.body.classList.contains("light")) {
        dayNight.querySelector("i").classList.add("bxs-moon")
    }
    else {
        dayNight.querySelector("i").classList.add("bxs-sun")
    }
});