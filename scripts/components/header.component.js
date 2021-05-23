import { ElementBuilder } from '../utilities/element-builder.js';

export class HeaderComp {
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;
    #boxMenu;
    #boxMenuNav;
    #burgerImg;
    #linkTo;
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

    #addPopUpMenu() {
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

    #showPopUpMenu() {
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

                if (searchMenu === 'go to') { // TODO: move content of this if to the distinct method    Moved
                    this.#addPopUpMenu();
                }

                this.#linkGoTo = this.#boxMenuNav.build();

                return this.#linkGoTo;

            })).build();

        //  crutch
        // const boxMenuChildren = this.#boxMenu.children;

        // for (let child of boxMenuChildren) {
        //     // TODO: move this to distinct method.       This way is much better than I created :) Corrected
        //     // what if go to won't be last child anymore?
        //     // store child and lastChild in component properties and then call method which adds this events
        //     if (child.classList.contains('go-to')) {

        //         child.addEventListener('mouseenter', () => {
        //             child.lastChild.style.display = 'block';
        //         });

        //         child.addEventListener('mouseleave', () => {
        //             child.lastChild.style.display = 'none';
        //         });
        //     }
        // }

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
