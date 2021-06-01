import { ElementBuilder } from '../utilities/element-builder';
import { ScrollableComp } from './scrollable.component';

export class HeaderComp extends ScrollableComp {
    private boxMenu: any;
    private burgerImg: any;

    private toggleBurger(): void {
        this.boxMenu.style.display = (this.boxMenu.style.display === 'block') ? 'none' : 'block';
        this.burgerImg.classList.toggle('pressed');
    }

    private createGoToMenu(): Node {
        return new ElementBuilder('ul')
            .setClasses('film-nav')
            .setChildren(...['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'].map(filmNumber => {
                const linkToFilm = new ElementBuilder('a').setClasses('top-film').build();

                linkToFilm.textContent = `.${filmNumber}`;
                linkToFilm.addEventListener('click', (event: any) => {
                    event.preventDefault();

                    this.scrollToFilm(filmNumber);

                    if (window.innerWidth < 768) {
                        this.toggleBurger();
                    }
                });

                return new ElementBuilder('li').setChildren(linkToFilm).build();
            })).build();
    }

    private displayGoToMenuOnHover(goToMenuUnit: Node, lastChildOfUnit: any): void {
        goToMenuUnit.addEventListener('mouseenter', () => {
            lastChildOfUnit.style.display = 'block';
        });

        goToMenuUnit.addEventListener('mouseleave', () => {
            lastChildOfUnit.style.display = 'none';
        });
    }

    render(): Node {
        this.boxMenu = new ElementBuilder('ul')
            .setClasses('box-menu')
            .setChildren(...['search', 'add to the favorites', 'faq', 'go to'].map(searchMenu => {
                const linkTo = new ElementBuilder('a').setClasses('box-menu-item').setAttributes({ 'href': '#' }).build();

                linkTo.textContent = searchMenu;

                const boxMenuNav = new ElementBuilder('li');

                if (searchMenu === 'go to') {
                    boxMenuNav.setClasses('go-to');

                    const goToMenu = this.createGoToMenu();
                    const childOfBoxMenuNav = boxMenuNav.setChildren(linkTo, goToMenu).build();

                    this.displayGoToMenuOnHover(childOfBoxMenuNav, goToMenu);

                    return childOfBoxMenuNav;
                }

                return boxMenuNav.setChildren(linkTo).build();

            })).build();

        this.burgerImg = new ElementBuilder('span').setAttributes({ 'id': 'burger-img' }).build();

        const navWrapper = new ElementBuilder('div').setAttributes({ 'id': 'nav-wrapper' }).setChildren(this.burgerImg).build();

        navWrapper.addEventListener('click', event => {
            event.stopPropagation();
            this.toggleBurger();
        });

        document.addEventListener('click', event => {
            const target = event.target as HTMLElement;

            if (window.innerWidth < 768 && target.closest('.box-menu') == undefined) {
                this.boxMenu.style.display = 'none';
                this.burgerImg.classList.remove('pressed');
            }
        })

        window.addEventListener('resize', () => {
            this.burgerImg.classList.remove('pressed');
            this.boxMenu.style.display = (window.innerWidth < 768) ? 'none' : 'block';
        });

        const nav = new ElementBuilder('nav').setChildren(navWrapper, this.boxMenu).build();
        const logoImg = new ElementBuilder('img').setAttributes({ 'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo' }).build();
        const logo = new ElementBuilder('a').setClasses('logo').setAttributes({ 'href': '#' }).setChildren(logoImg).build();
        const container = new ElementBuilder('div').setClasses('container').setChildren(logo, nav).build();

        return new ElementBuilder('header').setChildren(container).build();
    }
}
