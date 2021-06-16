export class AnimationService {
    private requestAnimationFrameId: number;

    public getAnimationId(): number {
        return this.requestAnimationFrameId;
    }

    public setAnimationId(id: number): void {
        this.requestAnimationFrameId = id;
    }
}
