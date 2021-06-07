import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modal-window.componenet';

export class ListenBtnComp implements IComp {
    private movieName: string;
    // private audioName: string; // TODO: make this component to accept film id instead of audio name   Corrected
    private movieId: number;

    constructor(movieName: string, movieId: number) {
        this.movieName = movieName;
        this.movieId = movieId
    }

    render(): HTMLElement {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            const modalWindow = new ModalWindowComp(this.movieId, this.movieName);

            document.body.appendChild(modalWindow.render());

            modalWindow.init();
            modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
