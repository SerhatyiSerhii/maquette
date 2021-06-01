export class AnimationService {
    private requestAnimationFrameId: number;

    getAnimationId(): number {
        return this.requestAnimationFrameId;
    }

    setAnimationId(id: number): void {
        this.requestAnimationFrameId = id;
    }
}
