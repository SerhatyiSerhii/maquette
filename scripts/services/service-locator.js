// Creation of custom dependencies and storing of objects
// TODO: this comment still does not explain why we use service locator instead of dependency injector
// TODO: !!!
// Get created services elsewhere. Service Locator is easier than Dependency Injector. Dependency Injector uses the same logic in its structure. Dependency Injector may create deadlock of dependencies, while Service Locator just takes the created instances somewhere outside. Dependency Injector uses constructor to create an instance, Service Locator is a place to store created instances (only receives and provides on request). For functions it doesn't matter who, how and where created a service instance, they just perform provided instructions.

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

// export { ServiceLocator, MEDIA_SERVICE, ANIMATION_SERVICE }; // TODO: you can write export directive along side every definition     Corrected
