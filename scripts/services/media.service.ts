export class MediaService {
    private listeners = [];

    registerMediaPlaying(listener) {
        this.listeners.push(listener);
    }

    notifyMediaPlaying(eventComp?) {
        for (let listener of this.listeners) {
            listener(eventComp);
        }
    }
}
