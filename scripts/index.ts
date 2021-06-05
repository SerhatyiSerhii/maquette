import { AppComp } from './components/application.componenet';
import { AnimationService } from './services/animation.service';
import { MediaService } from './services/media.service';
import { MovieSectionService } from './services/movie-section.service';
import { DataService } from './services/data.service';
import { ANIMATION_SERVICE, MEDIA_SERVICE, MOVIE_SECTION_SERVICE, DATA_SERVICE, ServiceLocator } from './services/service-locator';

'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());
ServiceLocator.register(MOVIE_SECTION_SERVICE, new MovieSectionService());
ServiceLocator.register(DATA_SERVICE, new DataService());

new AppComp().init();
