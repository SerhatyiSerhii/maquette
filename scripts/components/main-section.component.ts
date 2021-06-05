import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ScrollableComp } from './scrollable.component';
import { DataService } from '../services/data.service';
import { ServiceLocator, DATA_SERVICE } from '../services/service-locator';

export class MainSectionComp extends ScrollableComp implements IComp {
    private arrowDown: string = `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" /></svg>`;
    private dataService: DataService = ServiceLocator.inject<DataService>(DATA_SERVICE);

    render(): HTMLElement {
        const allMovies = this.dataService.getAllMovies();
        const lastMovie = allMovies[allMovies.length-1];

        const accentText = new ElementBuilder('span').setClasses('accent-text').build();
        accentText.textContent = 'The 10';

        const mainThemeSentence = new ElementBuilder('span').build();
        mainThemeSentence.innerHTML = '<br> Best Movie Soundtracks of All-Time'

        const mainTitle = new ElementBuilder('h1').setChildren(accentText, mainThemeSentence).build();

        const mainSentence = new ElementBuilder('p').build();
        mainSentence.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.'

        const arrowDown = new ElementBuilder('a').setClasses('arrow-down', 'arrow').build();
        arrowDown.innerHTML = this.arrowDown;

        arrowDown.addEventListener('click', (event) => {
            event.preventDefault();

            this.scrollToFilm(lastMovie.id);
        });

        const container = new ElementBuilder('div').setClasses('container').setChildren(mainTitle, mainSentence, arrowDown).build();
        const section = new ElementBuilder('section').setClasses('main-section').setChildren(container).build();

        return section;
    }
}
