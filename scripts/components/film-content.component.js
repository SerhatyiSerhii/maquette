import { ElementBuilder } from '../utilities/element-builder.js';
import { ListenBtnComp } from './listen-button.component.js';

export class FilmContentComp {
    #positionMovie;
    #titleMovie;
    #aboutMovie;
    #audioName;
    #listenButton;

    constructor(position, title, aboutMovie, audioName) {
        this.#positionMovie = position;
        this.#titleMovie = title;
        this.#aboutMovie = aboutMovie;
        this.#audioName = audioName;
    }

    render() {
        const movieNumber = new ElementBuilder('span').build();
        movieNumber.textContent = `.${this.#positionMovie}`;

        const movieTitle = new ElementBuilder('h2').build();
        movieTitle.textContent = this.#titleMovie;

        const compTitle = new ElementBuilder('div').setClasses('film-title-content').setChildren(movieNumber, movieTitle).build();

        const movieAbout = new ElementBuilder('p').build();
        movieAbout.textContent = this.#aboutMovie;

        this.#listenButton = new ListenBtnComp(this.#titleMovie, this.#audioName);
        const compDescription = new ElementBuilder('div').setClasses('film-description-content').setChildren(movieAbout, this.#listenButton.render()).build();

        const filmContent = new ElementBuilder('div').setClasses('film-content').setChildren(compTitle, compDescription).build();

        return filmContent;
    }
}
