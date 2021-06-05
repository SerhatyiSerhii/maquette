// Implemented Service Locator instead of Dependency Injector to simplify development

export class ServiceLocator {
    private static serviceContainer: { [key: string]: object } = {};

    static register(key: string, service: object): void {
        ServiceLocator.serviceContainer[key] = service;
    }

    static inject<T>(key: string): T {
        return ServiceLocator.serviceContainer[key] as unknown as T; // TODO:  refactor
    }
}

export const MEDIA_SERVICE = 'mediaServiceKey';
export const ANIMATION_SERVICE = 'animationServiceKey';
export const MOVIE_SECTION_SERVICE = 'movieSectionServiceKey';
export const DATA_SERVICE = 'dataServiceKey';
