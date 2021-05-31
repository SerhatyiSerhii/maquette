import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modale-window.componenet';

export class ListenBtnComp {
    private movieName;
    private audioName;

    constructor(movieName, audioName) {
        this.movieName = movieName;
        this.audioName = audioName;
    }

    render() {
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
