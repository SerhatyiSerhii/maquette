import { IComp } from '../models/i-comp';
import { DataService } from '../services/data.service';
import { ServiceLocator, Services } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modal-window.componenet';

export class ListenBtnComp implements IComp {
    private movieName: string;
    private movieId: number;
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.DATA_SERVICE);

    constructor(movieName: string, movieId: number) {
        this.movieName = movieName;
        this.movieId = movieId
    }

    public render(): HTMLElement {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        listenBtn.addEventListener('click', async () => {
            const modalWindow = new ModalWindowComp((await this.dataService.getAudioSourceById(this.movieId)).audioPath, this.movieName);

            document.body.appendChild(modalWindow.render());

            modalWindow.init();
            modalWindow.showModalWindow();
        });

        return listenBtn;
    }
}
