// imported scrollreveal.min.js but gsap lmao
gsap.from("container, .home-name, .home-education, .home-social, .scroll-down", {
    opacity: 0,
    duration: 3,
    delay: 1,
    y: 20,
    ease: "expo.out",
    stagger: 0.2,
});