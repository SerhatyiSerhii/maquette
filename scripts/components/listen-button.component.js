import { ElementBuilder } from '../utilities/element-builder.js';
import { ModalWindowComp } from './modale-window.componenet.js';

export class ListenBtnComp {
    #movieName;
    #audioName;

    constructor(movieName, audioName) {
        this.#movieName = movieName;
        this.#audioName = audioName;
    }

    render() {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            const modalWindow = new ModalWindowComp(this.#audioName, this.#movieName);

            document.body.appendChild(modalWindow.render());

            modalWindow.init();
            modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
