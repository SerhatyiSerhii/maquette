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
    }

    render() {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', () => {
            this.#modalWindow = new ModalWindowComp(this.#audioName, this.#movieName);

            document.body.appendChild(this.#modalWindow.render());

            this.init(); // TODO: what is the point? after append you can simply call init on modal window
            this.#modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}