import { ElementBuilder } from '../utilities/element-builder.js';

export class VolumeComp {
    #container;
    #label;
    #volumeHandle;
    #mediaElement;

    constructor(mediaElement) {
        this.#mediaElement = mediaElement;
    }

    init() {
        this.#volumeHandle.style.width = `${this.#container.clientWidth - this.#label.clientWidth}px`;
    }

    #putVolumeHandle(event) {
        const halfLabel = this.#label.clientWidth / 2;
        const volumeLeftCoor = this.#volumeHandle.getBoundingClientRect().left;
        let volHandlPos = event.pageX - volumeLeftCoor;
        const elMaxWidth = this.#container.clientWidth - halfLabel;

        if (volHandlPos >= elMaxWidth) {
            volHandlPos = elMaxWidth;
        } else if (volHandlPos <= halfLabel) {
            volHandlPos = halfLabel;
        }

        const calcCenterOfLable = volHandlPos - halfLabel;
        const volumeIndex = (calcCenterOfLable) / (this.#container.clientWidth - halfLabel * 2);

        this.#volumeHandle.style.width = `${calcCenterOfLable}px`;
        this.#mediaElement.volume = volumeIndex;
    }

    render() {
        this.#label = new ElementBuilder('div').setClasses('label').build();
        this.#volumeHandle = new ElementBuilder('div').setClasses('volume-handle').setChildren(this.#label).build();
        this.#container = new ElementBuilder('div').setClasses('volume').setChildren(this.#volumeHandle).build();

        this.#container.addEventListener('mousedown', (mouseDownEvent) => {
            this.#putVolumeHandle(mouseDownEvent);

            const moveLable = (event) => {
                this.#putVolumeHandle(event);
            }

            document.addEventListener('mousemove', moveLable);

            const oneMouseUp = () => {
                document.removeEventListener('mousemove', moveLable);
                document.removeEventListener('mouseup', oneMouseUp);
            }

            document.addEventListener('mouseup', oneMouseUp);
        });

        return this.#container;
    }
}
