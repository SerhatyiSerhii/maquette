// Implemented Service Locator instead of Dependency Injector to simplify development
export class ServiceLocator {
    private static serviceContainer: { [key: string]: {} } = {};

    public static register(key: Services, service: object): void {
        ServiceLocator.serviceContainer[key] = service;
    }

    public static inject<T>(key: Services): T {
        return ServiceLocator.serviceContainer[key] as T;
    }
}

export enum Services {
    MEDIA_SERVICE = 'mediaServiceKey',
    ANIMATION_SERVICE = 'animationServiceKey',
    MOVIE_SECTION_SERVICE = 'movieSectionServiceKey',
    DATA_SERVICE = 'dataServiceKey',
}
