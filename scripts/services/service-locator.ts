// Implemented Service Locator instead of Dependency Injector to simplify development
export class ServiceLocator {
    private static serviceContainer: { [key: string]: {} } = {};

    static register(key: string, service: object): void {
        ServiceLocator.serviceContainer[key] = service;
    }

    static inject<T>(key: string): T {
        return ServiceLocator.serviceContainer[key] as T;
    }
}

// TODO: let's meet enums
// create enum named Services
// make this constants as values of this enum
// make register and inject parameter key to be type of Services instead of string (it's okay if serviceContainer key type will be string then)
export const MEDIA_SERVICE = 'mediaServiceKey';
export const ANIMATION_SERVICE = 'animationServiceKey';
export const MOVIE_SECTION_SERVICE = 'movieSectionServiceKey';
export const DATA_SERVICE = 'dataServiceKey';
