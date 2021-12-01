var menu = document.getElementsByClassName("menuItems")[0];

// Get the offset position of the navbar
var sticky = menu.offsetTop;

$('#scrollTop').fadeIn();

// Get the menu
$(function () {
    $(window).scroll(function () {

        if (window.pageYOffset >= sticky) {
            menu.classList.add("sticky")
        } else {
            menu.classList.remove("sticky");
        }

        if ($(this).scrollTop() != 0) {
            $('#scrollTop').fadeIn();
        } else {
            $('#scrollTop').fadeOut();
        }
    });
    $('#scrollTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 700);
    });
});