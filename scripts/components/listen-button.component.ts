import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modale-window.componenet';

export class ListenBtnComp implements IComp {
    private movieName: string;
    private audioName: string;

    constructor(movieName: string, audioName: string) {
        this.movieName = movieName;
        this.audioName = audioName;
    }

    render(): HTMLElement {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            const modalWindow = new ModalWindowComp(this.audioName, this.movieName);

            document.body.appendChild(modalWindow.render());

            modalWindow.init();
            modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
