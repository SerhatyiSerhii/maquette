import { ElementBuilder } from '../utilities/element-builder.js';

// TODO: header and main section has a lot of duplication for animation
// inheritance can help us
// read about how classes can be extended
// create ScrollableComp and move all animation logic there
// extend header and main from new component
// leave all properties and method private except scrollToFilm
// the issues is that private fields cannot be accessed from derived classes
// so let's create new definition - protected methods and properties
// we will mark them already known sign - underscore in the beginning
// so protected properties and methods are like private - can't be accessed outside, but unlike private - can be accessed in derived classes

export class HeaderComp {
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;
    #boxMenu;
    #boxMenuNav; // TODO: no need
    #burgerImg;
    #linkTo; // TODO: no need
    #linkGoTo;
    #filmNav;

    #step = (newTimestamp) => {
        let toScroll = this.#startingPosition + (this.#distance * (newTimestamp - this.#start)) / this.#duration;

        if (toScroll >= this.#endingPosition) {
            toScroll = this.#endingPosition;
        }

        this.#page.scrollTop = toScroll;
        if (toScroll < this.#endingPosition) {
            requestAnimationFrame(this.#step);
        }
    }

    constructor(duration) {
        this.#duration = duration;
    }

    #go() {
        this.#start = performance.now();
        requestAnimationFrame(this.#step);
    }


    #scrollToFilm(arg) {
        this.#page = document.documentElement;
        this.#startingPosition = this.#page.scrollTop;
        this.#endingPosition = document.querySelector(arg).offsetTop;
        this.#distance = this.#endingPosition - this.#startingPosition;

        this.#go();
    }

    #toggleBurger() {
        this.#boxMenu.style.display = (this.#boxMenu.style.display === 'block') ? 'none' : 'block';
        this.#burgerImg.classList.toggle('pressed');
    }

    #addPopUpMenu() { // TODO: let this method just to create and return ul and all its content
        this.#boxMenuNav.setClasses('go-to');

        this.#filmNav = new ElementBuilder('ul')
            .setClasses('film-nav')
            .setChildren(...['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'].map(filmNumber => {
                const linkToFilm = new ElementBuilder('a').setClasses('top-film').setAttributes({ 'href': `#top-${filmNumber}` }).build();

                linkToFilm.textContent = `.${filmNumber}`;

                linkToFilm.addEventListener('click', (event) => {
                    event.preventDefault();
                    let topLink = linkToFilm.getAttribute('href');
                    this.#scrollToFilm(topLink);

                    if (window.innerWidth < 768) {
                        this.#toggleBurger();
                    }
                });

                return new ElementBuilder('li').setChildren(linkToFilm).build();;
            })).build();

            this.#boxMenuNav.setChildren(this.#linkTo, this.#filmNav);
    }

    #showPopUpMenu() { // TODO: does this method show popup menu?
        this.#linkGoTo.addEventListener('mouseenter', () => {
            this.#filmNav.style.display = 'block';
        });

        this.#linkGoTo.addEventListener('mouseleave', () => {
            this.#filmNav.style.display = 'none';
        });
    }

    render() {
        this.#boxMenu = new ElementBuilder('ul')
            .setClasses('box-menu')
            .setChildren(...['search', 'add to the favorites', 'faq', 'go to'].map(searchMenu => {
                this.#linkTo = new ElementBuilder('a').setClasses('box-menu-item').setAttributes({ 'href': '#' }).build();

                this.#linkTo.textContent = searchMenu;

                this.#boxMenuNav = new ElementBuilder('li').setChildren(this.#linkTo);

                if (searchMenu === 'go to') {
                    this.#addPopUpMenu();
                }

                // TODO: on the first iteration it will be 'search', second - 'add to fav', third - 'faq', and only in the last - 'go to'
                // so why is it here?
                this.#linkGoTo = this.#boxMenuNav.build();

                return this.#linkGoTo;

            })).build();

        this.#showPopUpMenu();

        this.#burgerImg = new ElementBuilder('span').setAttributes({ 'id': 'burger-img' }).build();

        const navWrapper = new ElementBuilder('div').setAttributes({ 'id': 'nav-wrapper' }).setChildren(this.#burgerImg).build();

        navWrapper.addEventListener('click', event => {
            event.stopPropagation();
            this.#toggleBurger();
        });

        document.addEventListener('click', event => {
            if (window.innerWidth < 768 && event.target.closest('.box-menu') == undefined) {
                this.#boxMenu.style.display = 'none';
                this.#burgerImg.classList.remove('pressed');
            }
        })

        window.addEventListener('resize', () => {
            this.#burgerImg.classList.remove('pressed');
            this.#boxMenu.style.display = (window.innerWidth < 768) ? 'none' : 'block';
        });

        const nav = new ElementBuilder('nav').setChildren(navWrapper, this.#boxMenu).build();
        const logoImg = new ElementBuilder('img').setAttributes({ 'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo' }).build();
        const logo = new ElementBuilder('a').setClasses('logo').setAttributes({ 'href': '#' }).setChildren(logoImg).build();
        const container = new ElementBuilder('div').setClasses('container').setChildren(logo, nav).build();

        return new ElementBuilder('header').setChildren(container).build();
    }
}
