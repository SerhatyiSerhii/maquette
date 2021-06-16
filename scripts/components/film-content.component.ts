import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ListenBtnComp } from './listen-button.component';

export class FilmContentComp implements IComp {
    private listenButton: ListenBtnComp;

    constructor(private positionMovie: string, private titleMovie: string, private aboutMovie: string, private movieId: number) { }

    public render(): HTMLElement {
        const movieNumber = new ElementBuilder('span').build();
        movieNumber.textContent = this.positionMovie;

        const movieTitle = new ElementBuilder('h2').build();
        movieTitle.textContent = this.titleMovie;

        const compTitle = new ElementBuilder('div').setClasses('film-title-content').setChildren(movieNumber, movieTitle).build();

        const movieAbout = new ElementBuilder('p').build();
        movieAbout.textContent = this.aboutMovie;

        this.listenButton = new ListenBtnComp(this.titleMovie, this.movieId);
        const compDescription = new ElementBuilder('div').setClasses('film-description-content').setChildren(movieAbout, this.listenButton.render()).build();

        const filmContent = new ElementBuilder('div').setClasses('film-content').setChildren(compTitle, compDescription).build();

        return filmContent;
    }
}
