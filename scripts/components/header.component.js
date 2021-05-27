import { ElementBuilder } from '../utilities/element-builder.js';
import { ScrollableComp } from './scrollable.component.js';

export class HeaderComp extends ScrollableComp {
    #boxMenu;
    #burgerImg;

    #toggleBurger() {
        this.#boxMenu.style.display = (this.#boxMenu.style.display === 'block') ? 'none' : 'block';
        this.#burgerImg.classList.toggle('pressed');
    }

    #createGoToMenu() {
        return new ElementBuilder('ul')
            .setClasses('film-nav')
            .setChildren(...['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'].map(filmNumber => {
                const linkToFilm = new ElementBuilder('a').setClasses('top-film').build();

                linkToFilm.textContent = `.${filmNumber}`;
                linkToFilm.addEventListener('click', (event) => {
                    event.preventDefault();

                    // TODO: MOVIE_SECTION:
                    // here you will pass 'movie-key'
                    // also .top-film link will not need href anymore

                    // Done

                    this._scrollToFilm(filmNumber);

                    if (window.innerWidth < 768) {
                        this.#toggleBurger();
                    }
                });

                return new ElementBuilder('li').setChildren(linkToFilm).build();;
            })).build();
    }

    #displayGoToMenuOnHover(goToMenuUnit, lastChildOfUnit) {
        goToMenuUnit.addEventListener('mouseenter', () => {
            lastChildOfUnit.style.display = 'block';
        });

        goToMenuUnit.addEventListener('mouseleave', () => {
            lastChildOfUnit.style.display = 'none';
        });
    }

    render() {
        this.#boxMenu = new ElementBuilder('ul')
            .setClasses('box-menu')
            .setChildren(...['search', 'add to the favorites', 'faq', 'go to'].map(searchMenu => {
                const linkTo = new ElementBuilder('a').setClasses('box-menu-item').setAttributes({ 'href': '#' }).build();

                linkTo.textContent = searchMenu;

                // const boxMenuNav = new ElementBuilder('li').setChildren(linkTo); // TODO: probably children can be set after 'if'    Corrected
                const boxMenuNav = new ElementBuilder('li');

                // let goToMenu; // TODO: why is it declared here?   Corrected

                if (searchMenu === 'go to') {
                    boxMenuNav.setClasses('go-to');

                    let goToMenu = this.#createGoToMenu();

                    boxMenuNav.setChildren(linkTo, goToMenu);

                    const childOfBoxMenuNav = boxMenuNav.build();

                    this.#displayGoToMenuOnHover(childOfBoxMenuNav, goToMenu);

                    return childOfBoxMenuNav;
                }

                // else {
                //     return boxMenuNav.build(); // TODO: since 'if' has return statement - no need to wrap this in 'else' statement    Corrected
                // }

                return boxMenuNav.setChildren(linkTo).build();

            })).build();

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
