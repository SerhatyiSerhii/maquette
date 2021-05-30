import { ElementBuilder } from '../utilities/element-builder.js';
import { ModalWindowComp } from './modale-window.componenet.js';

export class ListenBtnComp {
    #movieName;
    #audioName;
    #modalWindow; // TODO: what for?

    constructor(movieName, audioName) {
        this.#movieName = movieName;
        this.#audioName = audioName;
    }

    render() {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            this.#modalWindow = new ModalWindowComp(this.#audioName, this.#movieName);

            document.body.appendChild(this.#modalWindow.render());

            this.#modalWindow.init();
            this.#modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
