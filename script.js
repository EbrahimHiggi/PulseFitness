// navbar
(() =>{

let menuBut = document.querySelector('#menu-but');
let navbar = document.querySelector('.header .nav');

function closeNavbar(){
    navbar.classList.remove('active');
    menuBut.classList.add('fa-bars-staggered');
    menuBut.classList.remove('fa-xmark');
}

menuBut.addEventListener('click', (e) =>{
    e.stopPropagation();
    navbar.classList.toggle('active');
     menuBut.classList.toggle('fa-bars-staggered');
    menuBut.classList.toggle('fa-xmark');
});

document.addEventListener('click', (e) =>{
    if(!navbar.contains(e.target) && !menuBut.contains
(e.target)) closeNavbar();
});

navbar.addEventListener('click',(e)=>
e.stopPropagation());

window.addEventListener('scroll', closeNavbar);

})();


// home title
(() => {
    let home = document.querySelector('.home');
    let title = document.querySelector('.home h1');

    home.onmousemove = e => {
        let r = home.getBoundingClientRect();

        let x = (e.clientX - r.left - r.width / 2) / r.width * 40;
        let y = (e.clientY - r.top - r.height / 2) / r.height * 40;

        title.style.transform = `translate(${-x}px, ${-y}px)`;
    }

    home.onmouseleave = () => title.style.transform = '';
})();

function inputLimit(el, maxVal, maxLen){
    if(el.value.length > maxLen) el.value.slice(0,maxLen);
    if(parseFloat(el.value) > maxVal) el.value = maxVal;
}

// fixing over / touch on mobile

(() =>{
document.addEventListener('DOMContentLoaded', () =>{
    let selector = '.services .box, .products .box, .table .workout p';
    let interactiveElements = document.querySelectorAll
    (selector);
    let isTouchDevice = 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

    if(isTouchDevice){
        interactiveElements.forEach(elements =>{
            elements.addEventListener('touchstart', e =>{

                e.preventDefault();
                e.stopPropagation();

                let isActive = elements.classList.contains('hover');

                document.querySelectorAll('.hover').forEach
                (el =>{
                    if(el !== elements) el.classList.remove('hover');
                });

                if(isActive){
                    elements.classList.remove('hover');

                    if(elements.tagName === 'A' && elements.
                        href){
                            window.location.href = elements.href;
                        }else if (elements.tagName === 'BUTTON'){
                            elements.click();
                        }else{
                            elements.classList.add('hover');
                        }
                }else{
                    elements.classList.add('hover');
                }


            });

        });
        document.addEventListener('touchstart', e =>{
            if(!e.target.closest(selector)){
                document.querySelectorAll('.hover').forEach
                (el =>{
                    el.classList.remove('hover');

                });
            }

        });
    }
});
})();

// be-slider
(() =>{
    let beSlider = document.querySelector('.be-slider .slider');

    if(!beSlider) return;

    let clip = beSlider.querySelector('.after');
    let edit = beSlider.querySelector('.edit');
    let isDragging = false;

    let updateSlider = e =>{
        let react = beSlider.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let x = Math.min(Math.max(clientX - react.left, 0), react.width);
        let percentage = (x / react.width) *100 + '%';

        clip.style.width = percentage;
        edit.style.left = percentage;

        if(e.cancelable) e.preventDefault();

    };

    let startDragging = e =>{
        isDragging = true;
        updateSlider(e);

        document.addEventListener('mousemove', updateSlider);
        document.addEventListener('touchmove', updateSlider, {passive : true});
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);

    };

    let stopDragging = () =>{
        isDragging = false;
         document.removeEventListener('mousemove', updateSlider);
        document.removeEventListener('touchmove', updateSlider);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchend', stopDragging);
    };

    edit.addEventListener('mousedown', startDragging);
    edit.addEventListener('touchstart', startDragging, {passive : false});

})();

// BMI calculator

(() =>{

let result = document.getElementById('result');
let height = document.getElementById('height');
let weight = document.getElementById('weight');
let BMIbut = document.getElementById('BMIbut');

function calculateBMI(){
    let w = parseFloat(weight.value);
    let h = parseFloat(height.value);

    if(isNaN(w) || isNaN(h) || w <= 0 || h<= 0){
        result.textContent = 'please enter valid values';
        result.style.color = 'orange';
        return;
    }
    let hm = h / 100;
    let bmi = w / (hm * hm);
    let rounded = bmi.toFixed(1);

    result.style.color = 'var(--text-white)';
    result.innerHTML = '';
    let category = bmi < 18 ? 'Underweight' :
    bmi < 25 ? 'Normal weight' :
    bmi < 30 ? 'Over weight' : 'Obesity';

    result.style.color = 'var(--text-white)';
    result.innerHTML = `Your BMI is <strong>${rounded}</strong>
    (${category})`;


}
BMIbut.addEventListener('click', calculateBMI)

})();

// swiper sliders
var swiper = new Swiper(".reviews-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  grabcursor: true,
  centeredSlides: true,
  autoplay: { delay: 9500, disableOnInteraction: false },
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    770: { slidesPerView: 2 },
    991: { slidesPerView: 3 },
  },
});

// price switch

(() =>{
let switcher = document.querySelector('.pricing .price-switch');
let switchbut = switcher.querySelectorAll('button');
let prices = document.querySelectorAll('.pricing .price');
let periods = document.querySelectorAll('.pricing .period');

switchbut.forEach(but =>{
    but.addEventListener('click', () =>{
        switchbut.forEach(b => b.classList.remove('active'));
        but.classList.add('active');

        let yearly = but.textContent.trim().toLowerCase() === 'yearly';

        prices.forEach(price =>{
            let amount = yearly ? price.dataset.y : price.dataset.m;

            price.textContent = amount;

        });

        periods.forEach(p => p.textContent = yearly ? '/yr' :  '/ mo');
    });

});
})();
//  contact slider
(() =>{
    let loops = document.querySelectorAll('.contact .image .loop')

    window.addEventListener('load', () =>{

        let updateAll = () =>{
        loops.forEach(loop =>{
            let slide = loop.querySelector('.slide');
            if(!slide) return;

            let parentWidth = loop.offsetWidth;
            let slideWidth = slide.scrollWidth;
            let distance =  slideWidth - parentWidth;

            slide.style.setProperty('--move-distance', `-${distance}px`);
        });
    };
    updateAll();

    window.addEventListener('resize', updateAll);

    });

})();