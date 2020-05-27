const navbar = document.getElementById('navbar');
// navbar.setAttribute("opacity", 0.5);
console.log(1);

window.onscroll = function() { myFunction() };

function myFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.style.opacity = 0.9;
    } else {
        navbar.style.opacity = 1;
    }
}

function initMap() {
    // const map = document.querySelector(".map");
    map = new google.maps.Map(document.querySelector(".map"), {
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 14
    });
}