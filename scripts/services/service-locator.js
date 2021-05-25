// Implemented Service Locator instead of Dependency Injector to simplify development
// TODO: what about such a commnent?
// So easy? I thought the comment should tell the true benefit of Service Locator versus Dependency Injector
export class ServiceLocator {
    static #serviceContainer = {};

    static register(key, service) {
        ServiceLocator.#serviceContainer[key] = service;
    }

    static inject(key) {
        return ServiceLocator.#serviceContainer[key];
    }
}

export const MEDIA_SERVICE = 'mediaServiceKey';
export const ANIMATION_SERVICE = 'animationServiceKey';
