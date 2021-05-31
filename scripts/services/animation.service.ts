export class AnimationService {
    private requestAnimationFrameId;

    getAnimationId() {
        return this.requestAnimationFrameId;
    }

    setAnimationId(id) {
        this.requestAnimationFrameId = id;
    }
}
