/**
 * Theme: Zircos Admin Template
 * Author: Coderthemes
 * Module/App: Main Js
 */


(function ($) {

    'use strict';

    function initNavbar() {

        $('.navbar-toggle').on('click', function (event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    }

    function initSlimscroll() {
        $('.slimscroll-noti').slimScroll({
            height: '230px',
            position: 'right',
            size: "5px",
            color: '#98a6ad',
            wheelStep: 10
        });
    }

    function initMenuActiveUrl() {
        // === following js will activate the menu in left side bar based on url ====
        $(document).ready(function () {
            $(".navigation-menu a").each(function () {
                var pageUrl = window.location.href.split(/[?#]/)[0];
                if (this.href == pageUrl) {
                    $(this).parent().addClass("active"); // add active to li of the current link
                    $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                    $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
                }
            });
        });
    }

    function init() {
        initNavbar();
        initSlimscroll();
        initMenuActiveUrl();
    }

    init();

})(jQuery);

		
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn1')) {

    var dropdowns = document.getElementsByClassName("dropdown-content1");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}







