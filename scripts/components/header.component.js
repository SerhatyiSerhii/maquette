import { ElementBuilder } from '../utilities/element-builder.js';
import {ScrollableComp} from './scrollable.component.js';

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

// Done

export class HeaderComp extends ScrollableComp {
    #boxMenu;
    // #boxMenuNav; // TODO: no need    Deleted
    #burgerImg;
    // #linkTo; // TODO: no need     Deleted
    #linkGoTo;
    #filmNav;

    #toggleBurger() {
        this.#boxMenu.style.display = (this.#boxMenu.style.display === 'block') ? 'none' : 'block';
        this.#burgerImg.classList.toggle('pressed');
    }

    #addPopUpMenu() { // TODO: let this method just to create and return ul and all its content     Corrected

        this.#filmNav = new ElementBuilder('ul')
            .setClasses('film-nav')
            .setChildren(...['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'].map(filmNumber => {
                const linkToFilm = new ElementBuilder('a').setClasses('top-film').setAttributes({ 'href': `#top-${filmNumber}` }).build();

                linkToFilm.textContent = `.${filmNumber}`;

                linkToFilm.addEventListener('click', (event) => {
                    event.preventDefault();
                    let topLink = linkToFilm.getAttribute('href');
                    this._scrollToFilm(topLink);

                    if (window.innerWidth < 768) {
                        this.#toggleBurger();
                    }
                });

                return new ElementBuilder('li').setChildren(linkToFilm).build();;
            })).build();

        return this.#filmNav;
    }

    #displayPopUpMenu() { // TODO: does this method show popup menu?     Corrected

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
                const linkTo = new ElementBuilder('a').setClasses('box-menu-item').setAttributes({ 'href': '#' }).build();

               linkTo.textContent = searchMenu;

                const boxMenuNav = new ElementBuilder('li').setChildren(linkTo);

                if (searchMenu === 'go to') {
                    boxMenuNav.setClasses('go-to');

                    this.#addPopUpMenu();

                    boxMenuNav.setChildren(linkTo, this.#filmNav);
                }

                // TODO: on the first iteration it will be 'search', second - 'add to fav', third - 'faq', and only in the last - 'go to'
                // so why is it here?
                // Yep, it's true. And if add new nav item it will be showing navigation on hover over last item. not on go-to. But I have to use again a crutch method as addEventListener works on ready DOM elements :/

                // this.#linkGoTo = boxMenuNav.build();
                // return this.#linkGoTo;

                return boxMenuNav.build();

            })).build();

        const boxMenuChildren = this.#boxMenu.children;

        for (let child of boxMenuChildren) {
            if (child.classList.contains('go-to')) {
                this.#linkGoTo = child;

                this.#displayPopUpMenu();
            }
        }

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
