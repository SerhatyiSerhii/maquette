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

// TODO: let's meet enums   ok
// create enum named Services   ok
// make this constants as values of this enum   ok
// make register and inject parameter key to be type of Services instead of string (it's okay if serviceContainer key type will be string then)     ok
// Corrected
// export const MEDIA_SERVICE = 'mediaServiceKey';
// export const ANIMATION_SERVICE = 'animationServiceKey';
// export const MOVIE_SECTION_SERVICE = 'movieSectionServiceKey';
// export const DATA_SERVICE = 'dataServiceKey';

export const enum Services {
    MEDIA_SERVICE = 'mediaServiceKey',
    ANIMATION_SERVICE = 'animationServiceKey',
    MOVIE_SECTION_SERVICE = 'movieSectionServiceKey',
    DATA_SERVICE = 'dataServiceKey',
}
