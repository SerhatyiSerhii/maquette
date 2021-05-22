export class AnimationService {
    #requestAnimationFrameId;

    getAnimationId() {
        return this.#requestAnimationFrameId;
    }

    setAnimationId(id) {
        this.#requestAnimationFrameId = id;
    }
}