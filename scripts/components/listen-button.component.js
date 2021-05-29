import { ElementBuilder } from '../utilities/element-builder.js';
import { ModalWindowComp } from './modale-window.componenet.js';

export class ListenBtnComp {
    #movieName;
    #audioName;
    #modalWindow;

    constructor(movieName, audioName) {
        this.#movieName = movieName;
        this.#audioName = audioName;
    }

    init() {
        this.#modalWindow.init();
    } // TODO: what for?     Corrected. Looks like we don't need the long chain of init methods. We can simply call init method of volume component
    // at modale window creation and at slider-frame creation (when js reads video canplay).

    render() {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            this.#modalWindow = new ModalWindowComp(this.#audioName, this.#movieName);

            document.body.appendChild(this.#modalWindow.render());

            this.init();
            this.#modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
