import { ElementBuilder } from '../utilities/element-builder.js';

export class MainSectionComp {
    #arrowDown = `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" /></svg>`;
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;
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

    render() {
        const accentText = new ElementBuilder('span').setClasses('accent-text').build();
        accentText.textContent = 'The 10';

        const breakLine = new ElementBuilder('br').build();
        const textNode = document.createTextNode('Best Movie Soundtracks of All-Time');
        const mainTitle = new ElementBuilder('h1').setChildren(accentText, breakLine, textNode).build();

        const mainSentence = new ElementBuilder('p').build();
        mainSentence.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.'

        const arrowDown = new ElementBuilder('a').setClasses('arrow-down', 'arrow').setAttributes({ 'href': '#top-10' }).build();
        arrowDown.innerHTML = this.#arrowDown;

        arrowDown.addEventListener('click', (event) => {
            event.preventDefault();
            const firstTopFilm = arrowDown.getAttribute('href');

            this.#scrollToFilm(firstTopFilm);
        });

        const container = new ElementBuilder('div').setClasses('container').setChildren(mainTitle, mainSentence, arrowDown).build();
        const section = new ElementBuilder('section').setClasses('main-section').setChildren(container).build();

        return section;
    }
}
