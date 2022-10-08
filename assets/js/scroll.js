/*===== show scroll up =====*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // when the scroll is higher than 560 viewport height,
    // add the show-scroll class to the a tag with the scroll-top class.
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*===== jquery scroll for mobile =====*/
$(document).ready(function(){
    // Add smooth scrolling to all links with the class scroll
    $("a.scroll").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        } // End if
    });
});