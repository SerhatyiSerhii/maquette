import { AppComp } from './components/application.componenet';
import { AnimationService } from './services/animation.service';
import { MediaService } from './services/media.service';
import { MovieSectionService } from './services/movie-section.service';
import { ANIMATION_SERVICE, MEDIA_SERVICE, MOVIE_SECTION, ServiceLocator } from './services/service-locator';

'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());
ServiceLocator.register(MOVIE_SECTION, new MovieSectionService());

new AppComp().init();
