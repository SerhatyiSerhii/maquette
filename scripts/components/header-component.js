import {ElementBuilder} from './element-builder.js';

export class HeaderComp {
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;
    #boxMenu;
    #burgerImg;

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

    render() {

        this.#boxMenu = new ElementBuilder('ul').setClasses('box-menu').setChildren(...['search', 'add to the favorites', 'faq', 'go to'].map(searchMenu => {
            const linkTo = new ElementBuilder('a').setClasses('box-menu-item').setAttributes({'href': '#'}).build();

            linkTo.textContent = searchMenu;

            const boxMenuNav = new ElementBuilder('li').setChildren(linkTo);

            if (searchMenu === 'go to') {
                boxMenuNav.setClasses('go-to');

                const filmNav = new ElementBuilder('ul').setClasses('film-nav').setChildren(...['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'].map( filmNumber => {
                    const linkToFilm = new ElementBuilder('a').setClasses('top-film').setAttributes({'href': `#top-${filmNumber}`}).build();

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

                boxMenuNav.setChildren(linkTo, filmNav);
            }

            return boxMenuNav.build();
        })).build();

        //  crutch
        const boxMenuChildren = this.#boxMenu.children;

        for (let child of boxMenuChildren) {
            if (child.classList.contains('go-to')) {

                child.addEventListener('mouseenter', () => {
                    child.lastChild.style.display = 'block';
                });

                child.addEventListener('mouseleave', () => {
                    child.lastChild.style.display = 'none';
                });
            }
        }

        this.#burgerImg = new ElementBuilder('span').setAttributes({'id': 'burger-img'}).build();

        const navWrapper = new ElementBuilder('div').setAttributes({'id': 'nav-wrapper'}).setChildren(this.#burgerImg).build();

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

        const logoImg = new ElementBuilder('img').setAttributes({'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo'}).build();

        const logo = new ElementBuilder('a').setClasses('logo').setAttributes({'href': '#'}).setChildren(logoImg).build();

        const container = new ElementBuilder('div').setClasses('container').setChildren(logo, nav).build();

        return new ElementBuilder('header').setChildren(container).build();
    }
}
