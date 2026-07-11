/*=====================================================
YASHASWI GROUPS OF CONSTRUCTION
JavaScript
=====================================================*/

/*=====================================================
LOADER
=====================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1200);

});

/*=====================================================
STICKY HEADER
=====================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.background = "#0D1B2A";
        header.style.padding = "12px 0";

    } else {

        header.style.background = "rgba(13,27,42,.75)";
        header.style.padding = "20px 0";

    }

});

/*=====================================================
COUNTER ANIMATION
=====================================================*/

const counters = document.querySelectorAll(".counter");

const speed = 120;

function startCounter() {

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.getAttribute("data-target");

            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {

                counter.innerText = Math.ceil(count + increment);

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

    });

}

const stats = document.querySelector(".statistics");

const observer = stats ? new IntersectionObserver(entries => {

    if (entries[0].isIntersecting) {

        startCounter();

        observer.disconnect();

    }

}) : null;

if (observer) observer.observe(stats);

/*=====================================================
SMOOTH SCROLL
=====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});
/*=====================================================
BACK TO TOP BUTTON
=====================================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if(window.scrollY > 500){

        topBtn.classList.add("showTop");

    }

    else{

        topBtn.classList.remove("showTop");

    }

});

if (topBtn) topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/*=====================================================
SCROLL ANIMATION
=====================================================*/

const revealElements = document.querySelectorAll(

".feature-card,.stat-card,.amenity-card,.testimonial-card,.project-image,.project-content,.gallery-grid img,.highlight-box"

);

function reveal(){

    revealElements.forEach(el=>{

        const windowHeight = window.innerHeight;

        const top = el.getBoundingClientRect().top;

        if(top < windowHeight - 80){

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();
/*=====================================================
GALLERY LIGHTBOX
=====================================================*/

const images = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

document.body.appendChild(lightbox);

images.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.classList.add("active");

const img = document.createElement("img");

img.src = image.src;

while(lightbox.firstChild){

lightbox.removeChild(lightbox.firstChild);

}

lightbox.appendChild(img);

});

});

lightbox.addEventListener("click",()=>{

lightbox.classList.remove("active");

});
/*=====================================================
HERO SLIDER
=====================================================*/

const hero = document.querySelector(".hero");

const assetPath = (path) => (window.YASHASWI_BASE || "") + "/" + path;

const slides=[

assetPath("assets/hero/hero-1.jpg"),

];

let current=0;

function heroSlider(){

current++;

if(current>=slides.length){

current=0;

}

hero.style.backgroundImage=`url(${slides[current]})`;

}

if (hero) setInterval(heroSlider,5000);
/*=====================================================
MOBILE MENU
=====================================================*/

const menu=document.querySelector(".menu-toggle");

const nav=document.querySelector(".nav-links");

if (menu && nav) menu.addEventListener("click",()=>{

nav.classList.toggle("show");

});
