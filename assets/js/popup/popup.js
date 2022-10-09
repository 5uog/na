/*===== popup tab =====*/
$(function (){
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        midClick: true, // to open the link in new tab
        removalDelay: 200,
        closeOnBgClick: true, // nothing changed
        enableEscapeKey: true, // nothing changed
    });
});