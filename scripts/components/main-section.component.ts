import { ElementBuilder } from '../utilities/element-builder';
import {ScrollableComp} from './scrollable.component';

export class MainSectionComp extends ScrollableComp{
    private arrowDown: string = `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" /></svg>`;

    render(): Node {
        const accentText = new ElementBuilder('span').setClasses('accent-text').build();
        accentText.textContent = 'The 10';

        const breakLine = new ElementBuilder('br').build();
        const textNode = document.createTextNode('Best Movie Soundtracks of All-Time');
        const mainTitle = new ElementBuilder('h1').setChildren(accentText, breakLine, textNode).build();

        const mainSentence = new ElementBuilder('p').build();
        mainSentence.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.'

        const arrowDown = new ElementBuilder('a').setClasses('arrow-down', 'arrow').build();
        arrowDown.innerHTML = this.arrowDown;

        arrowDown.addEventListener('click', (event: any) => {
            event.preventDefault();
            const firstTopFilm = '10';

            this.scrollToFilm(firstTopFilm);
        });

        const container = new ElementBuilder('div').setClasses('container').setChildren(mainTitle, mainSentence, arrowDown).build();
        const section = new ElementBuilder('section').setClasses('main-section').setChildren(container).build();

        return section;
    }
}
