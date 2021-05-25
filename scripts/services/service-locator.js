// Implemented Service Locator instead of Dependency Injector to simplify development
// So easy? I thought the comment should tell the true benefit of Service Locator versus Dependency Injector
// those who are going to work with this code must know what service locator and dependency injector are, you shouldn't explain
// There are no benefits to use service locator, it's anti-pattern
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
