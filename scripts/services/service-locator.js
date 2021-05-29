// Implemented Service Locator instead of Dependency Injector to simplify development
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
export const MOVIE_SECTION = 'movieSectionServiceKey';
