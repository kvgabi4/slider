import {
    slides,
    slideTexts
} from './module.js';

'use strict';

// ---- Paramteters: ----
// Give the time of the slides changes in milliseconds:
const stepTime = 2000;
// Give the height of the slides in pixels:
const slideHeight = 300;

const imageContainer = document.querySelector('.image-container');
const serialNumber = document.querySelector('.serial-number');
const left = document.querySelector('.fa.fa-angle-left');
const right = document.querySelector('.fa.fa-angle-right');
const circles = document.querySelector('.circles');

// Add circles to the DOM.
slides.forEach(item => {
    circles.insertAdjacentHTML('afterbegin', `<span class="dot"></span>`);
});

const circleArray = document.querySelectorAll('.dot');

let currentSlide = 1;
let insertedImage;
let insertedText;

// Set the height of the slider.
function setHeight(element, height) {
    element.style.height = `${height}px`;
};

setHeight(imageContainer, slideHeight);

// Set the new slide.
function slideSettings(slide) {
    insertedText = imageContainer.insertAdjacentHTML('afterbegin', `<div class="image-text">${slideTexts[slide]}</div>`);
    insertedImage = imageContainer.insertAdjacentHTML('afterbegin', `<img class="image" src="${slides[slide]}" alt="${slideTexts[slide]}">`);
    circleArray[slide].classList.add('active');
    setHeight(document.querySelector('.image'), slideHeight);
};

// Set the initial slide.
(function setInitialSlide() {
    slideSettings(0);
    serialNumber.textContent = `1 / ${slides.length}`;
})();

// Settings of the current slide.
function setCurrentSlide(slide, imgOut = 'image-left-out', imgIn = 'image-right-in') {
    const image = document.querySelector('.image');
    image.classList.add(imgOut);
    document.querySelector('.image-text').remove();
    setTimeout(() => {
        image.remove();
        clearTimeout();
    }, stepTime);
    
    circleArray.forEach(item => item.classList.remove('active'));
    slideSettings(slide);
    document.querySelector('.image').classList.add(imgIn);
    
    setTimeout(() => {
        serialNumber.textContent = `${slide + 1} / ${slides.length}`;
        clearTimeout();
    }, stepTime/3);
};

// Automatic changing of the slides.
let interval;
function autoStep() {
    interval = setInterval(() => {
        //circleArray.forEach(item => item.classList.remove('cannot-be-clicked'));
        currentSlide += 1;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        };
        setCurrentSlide(currentSlide);
    }, stepTime);
};

// Manual changing of the slides.
// -> Right step.
function rightStep() {
    clearInterval(interval);
    currentSlide += 1;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    };
    setCurrentSlide(currentSlide);
    autoStep();
};

// -> Left step.
function leftStep() {
    clearInterval(interval);
    currentSlide -= 1;
    if (currentSlide <= -1) {
        currentSlide = slides.length - 1;
    };
    setCurrentSlide(currentSlide, 'image-right-out', 'image-left-in');
    autoStep();
};

function manualStep() {
    currentSlide -= 1;
    left.addEventListener('click', () => leftStep());
    right.addEventListener('click', () => rightStep());
};

// Jump to a slide by clikcking on a circle.
function jumpToSlide() {
    circleArray.forEach((item, index) => item.addEventListener('click', () => {
        clearInterval(interval);
        setCurrentSlide(index);
        //circleArray.forEach(item => item.classList.add('cannot-be-clicked'));
        autoStep();
        index === 3 ? currentSlide = 0 : currentSlide = index + 1;
        return currentSlide;
    }));
};

autoStep();
manualStep();
jumpToSlide();
