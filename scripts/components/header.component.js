import { ElementBuilder } from '../utilities/element-builder.js';
import { ScrollableComp } from './scrollable.component.js';

export class HeaderComp extends ScrollableComp {
    #boxMenu;
    #burgerImg;
    #linkGoTo; // TODO: no need
    #filmNav; // TODO: no need

    #toggleBurger() {
        this.#boxMenu.style.display = (this.#boxMenu.style.display === 'block') ? 'none' : 'block';
        this.#burgerImg.classList.toggle('pressed');
    }

    #addPopUpMenu() { // TODO: does this method add popup menu?
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

    #displayPopUpMenu() { // TODO: does this method display popup menu?
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

                return boxMenuNav.build();

            })).build();

        const boxMenuChildren = this.#boxMenu.children;

        for (let child of boxMenuChildren) { // TODO: move this logic to map method above
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
