import { SliderFrameComp } from "../components/slider-frame.component";

export class MediaService {
    private listeners: ((eventComp: SliderFrameComp) => void)[] = [];

    registerMediaPlaying(listener: (eventComp: SliderFrameComp) => void): void {
        this.listeners.push(listener);
    }

    notifyMediaPlaying(eventComp?: SliderFrameComp): void {
        for (let listener of this.listeners) {
            listener(eventComp);
        }
    }
}
