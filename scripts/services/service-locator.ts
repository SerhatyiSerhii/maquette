// Implemented Service Locator instead of Dependency Injector to simplify development
export class ServiceLocator {
    private static serviceContainer: { [key: string]: {} } = {};

    static register(key: Services, service: object): void {
        ServiceLocator.serviceContainer[key] = service;
    }

    static inject<T>(key: Services): T {
        return ServiceLocator.serviceContainer[key] as T;
    }
}

export const enum Services { // TODO: enum is not a const
    MEDIA_SERVICE = 'mediaServiceKey',
    ANIMATION_SERVICE = 'animationServiceKey',
    MOVIE_SECTION_SERVICE = 'movieSectionServiceKey',
    DATA_SERVICE = 'dataServiceKey',
}
