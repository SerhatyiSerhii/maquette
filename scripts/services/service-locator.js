// Creation of custom dependencies and storing of objects
// TODO: this comment still does not explain why we use service locator instead of dependency injector
// TODO: !!!

class ServiceLocator {
    static #serviceContainer = {};

    static register(key, service) {
        ServiceLocator.#serviceContainer[key] = service;
    }

    static inject(key) {
        return ServiceLocator.#serviceContainer[key];
    }
}

const MEDIA_SERVICE = 'mediaServiceKey';
const ANIMATION_SERVICE = 'animationServiceKey';

export { ServiceLocator, MEDIA_SERVICE, ANIMATION_SERVICE }; // TODO: you can write export directive along side every definition
