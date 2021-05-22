// Encapsulation of services to ensure one objects can access to another objects
// TODO: this comment still does not explain why we use service locator instead of dependency injector
export class ServiceLocator {
    static #serviceContainer = {};

    static register(key, service) {
        ServiceLocator.#serviceContainer[key] = service;
    }

    static inject(key) {
        return ServiceLocator.#serviceContainer[key];
    }
}
