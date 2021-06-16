import { SliderFrameComp } from "../components/slider-frame.component";

export class MediaService {
    private listeners: ((eventComp: SliderFrameComp) => void)[] = [];

    public registerMediaPlaying(listener: (eventComp: SliderFrameComp) => void): void {
        this.listeners.push(listener);
    }

    public notifyMediaPlaying(eventComp?: SliderFrameComp): void {
        for (let listener of this.listeners) {
            listener(eventComp);
        }
    }
}
