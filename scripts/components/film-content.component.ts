import { ElementBuilder } from '../utilities/element-builder';
import { ListenBtnComp } from './listen-button.component';

export class FilmContentComp {
    private positionMovie: string;
    private titleMovie: string;
    private aboutMovie: string;
    private audioName: string;
    private listenButton: any;

    constructor(position: string, title: string, aboutMovie: string, audioName: string) {
        this.positionMovie = position;
        this.titleMovie = title;
        this.aboutMovie = aboutMovie;
        this.audioName = audioName;
    }

    render(): Node {
        const movieNumber = new ElementBuilder('span').build();
        movieNumber.textContent = `.${this.positionMovie}`;

        const movieTitle = new ElementBuilder('h2').build();
        movieTitle.textContent = this.titleMovie;

        const compTitle = new ElementBuilder('div').setClasses('film-title-content').setChildren(movieNumber, movieTitle).build();

        const movieAbout = new ElementBuilder('p').build();
        movieAbout.textContent = this.aboutMovie;

        this.listenButton = new ListenBtnComp(this.titleMovie, this.audioName);
        const compDescription = new ElementBuilder('div').setClasses('film-description-content').setChildren(movieAbout, this.listenButton.render()).build();

        const filmContent = new ElementBuilder('div').setClasses('film-content').setChildren(compTitle, compDescription).build();

        return filmContent;
    }
}
