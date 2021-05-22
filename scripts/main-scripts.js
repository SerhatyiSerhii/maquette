import {ServiceLocator} from './services/service-locator.js';
import {MediaService} from './services/media-service.js';
import {AnimationService} from './services/animation-service.js';
import {HeaderComp} from './components/header-component.js';
import {FooterComp} from './components/footer-component.js';
import {WrapperComp} from './components/wrapper-component.js';

'use strict';

const MEDIA_SERVICE = 'mediaServiceKey';
const ANIMATION_SERVICE = 'animationServiceKey';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());

document.addEventListener('DOMContentLoaded', function () {

    // Adding header
    // function createHeader(array) { // TODO: move to component    Moved

    //     var makeHeader = makeElem('header');
    //     console.log(new HeaderComp().render());
    //     var makeContainer = makeElem('div', 'container');

    //     var makeLogo = makeElem('a', 'logo');
    //     setAttribute(makeLogo, { 'href': '#' })

    //     var makeLogoImg = makeElem('img');
    //     setAttribute(makeLogoImg, { 'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo' });

    //     var makeNav = makeElem('nav');

    //     var makeNavWrapper = makeElem('div');
    //     setAttribute(makeNavWrapper, { 'id': 'nav-wrapper' })

    //     makeNavWrapper.addEventListener('click', function (event) {
    //         event.stopPropagation();
    //         toggleBurger();
    //     });

    //     var makeBurger = makeElem('span');
    //     setAttribute(makeBurger, { 'id': 'burger-img' })

    //     var makeUl = makeElem('ul', 'box-menu');

    //     var mainMap = new Map([
    //         [makeHeader, [makeContainer]],
    //         [makeLogo, [makeLogoImg]],
    //         [makeContainer, [makeLogo, makeNav]],
    //         [makeNav, [makeNavWrapper, makeUl]],
    //         [makeNavWrapper, [makeBurger]],
    //         [document.body, [makeHeader]]
    //     ]);

    //     insert(mainMap);

    //     var navigation = ['Search', 'Add to the Favorites', 'FAQ', 'Go to'];

    //     navigation.forEach(function (item) {
    //         var makeListItm = makeElem('li');

    //         var makeLink = makeElem('a', 'box-menu-item');
    //         setAttribute(makeLink, { 'href': '#' });
    //         makeLink.textContent = item;

    //         var navigationMap = new Map([
    //             [makeUl, [makeListItm]],
    //             [makeListItm, [makeLink]]
    //         ]);

    //         insert(navigationMap);

    //         if (item === 'Go to') {
    //             makeListItm.classList.add('go-to');

    //             var makeFilmNav = makeElem('ul', 'film-nav');

    //             makeListItm.addEventListener('mouseenter', function () {
    //                 makeFilmNav.style.display = 'block';
    //             });

    //             makeListItm.addEventListener('mouseleave', function () {
    //                 makeFilmNav.style.display = 'none';
    //             });

    //             var goToMap = new Map();
    //             goToMap.set(makeListItm, [makeFilmNav]);
    //             insert(goToMap);

    //             for (var element of array) {
    //                 var makeListItm = makeElem('li');

    //                 var makeLink = makeElem('a', 'top-film');
    //                 setAttribute(makeLink, { 'href': '#top-' + element });
    //                 makeLink.textContent = '.' + element;

    //                 var topFilmMap = new Map([
    //                     [makeFilmNav, [makeListItm]],
    //                     [makeListItm, [makeLink]]
    //                 ]);

    //                 insert(topFilmMap);

    //                 makeLink.addEventListener('click', function (event) {
    //                     event.preventDefault();
    //                     var topLink = this.getAttribute('href');
    //                     scrollToFilm(topLink);

    //                     if (window.innerWidth < 768) {
    //                         toggleBurger();
    //                     }
    //                 });
    //             }
    //         }
    //     });

    //     document.addEventListener('click', function (event) {
    //         if (window.innerWidth < 768 && event.target.closest('.box-menu') == undefined) {
    //             makeUl.style.display = 'none';
    //             makeBurger.classList.remove('pressed');
    //         }
    //     });

    //     window.addEventListener('resize', function () {
    //         makeBurger.classList.remove('pressed');
    //         makeUl.style.display = (window.innerWidth < 768) ? 'none' : 'block';
    //     });

    //     function toggleBurger() {
    //         makeUl.style.display = (makeUl.style.display === 'block') ? 'none' : 'block';
    //         makeBurger.classList.toggle('pressed');
    //     }
    // }

    function setVolumeAfterAppend() {
        var volume = document.getElementsByClassName('volume');

        for (var item of volume) {
            var volumeHandle = item.querySelector('.volume-handle');
            var volumeLable = item.querySelector('.label');

            volumeHandle.style.width = (item.clientWidth - volumeLable.clientWidth) + 'px';
        }
    }

    document.body.appendChild(new HeaderComp(300).render());
    document.body.appendChild(new WrapperComp().render());
    document.body.appendChild(new FooterComp().render());

    setVolumeAfterAppend();
});
