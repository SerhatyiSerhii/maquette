import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';
import { ModalWindowComp } from './modal-window.componenet';
import { Services, ServiceLocator } from '../services/service-locator';
import { DataService } from '../services/data.service';

export class ListenBtnComp implements IComp {
    private movieName: string;
    private movieId: number;
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.DATA_SERVICE);

    constructor(movieName: string, movieId: number) {
        this.movieName = movieName;
        this.movieId = movieId
    }

    render(): HTMLElement {
        const listenBtn = new ElementBuilder('button').setClasses('listen').build();
        listenBtn.textContent = 'listen';

        // TODO: you will need to use data service here
        // use async method instead of general
        // Corrected
        listenBtn.addEventListener('click', () => {
            // const modalWindow = new ModalWindowComp(this.dataService.getAudioSourceById(this.movieId).audioPath, this.movieName); // TODO: and let's modal window accepts audio src instead of movie id     Corrected

            this.dataService.getAudioSourceByIdAsync(this.movieId, (audio) => {
                const modalWindow = new ModalWindowComp(audio.audioPath, this.movieName);

                document.body.appendChild(modalWindow.render());

                modalWindow.init();
                modalWindow.showModalWindow();
            });
        });

        return listenBtn;
    }
}
