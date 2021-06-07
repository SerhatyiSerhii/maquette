import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modal-window.componenet';

export class ListenBtnComp implements IComp {
    private movieName: string;
    private movieId: number;

    constructor(movieName: string, movieId: number) {
        this.movieName = movieName;
        this.movieId = movieId
    }

    render(): HTMLElement {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        // TODO: you will need to use data service here
        // use async method instead of general
        listenBtn.addEventListener('click', () => {
            const modalWindow = new ModalWindowComp(this.movieId, this.movieName); // TODO: and let's modal window accepts audio src instead of movie id

            document.body.appendChild(modalWindow.render());

            modalWindow.init();
            modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
