export class MediaService {
    private listeners: any = [];

    registerMediaPlaying(listener: any): void {
        this.listeners.push(listener);
    }

    notifyMediaPlaying(eventComp?: any): void {
        for (let listener of this.listeners) {
            listener(eventComp);
        }
    }
}
