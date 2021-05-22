// Encapsulation of services to ensure one objects can access to another objects // TODO: this comment is not explain why service locator used     Changed comment
export class ServiceLocator {
    static #serviceContainer = {};

    static register(key, service) {
        ServiceLocator.#serviceContainer[key] = service;
    }

    static inject(key) {
        return ServiceLocator.#serviceContainer[key];
    }
}