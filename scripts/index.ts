import { AppComp } from './components/application.componenet';
import { AnimationService } from './services/animation.service';
import { DataService } from './services/data.service';
import { MediaService } from './services/media.service';
import { MovieSectionService } from './services/movie-section.service';
import { ANIMATION_SERVICE, DATA_SERVICE, MEDIA_SERVICE, MOVIE_SECTION_SERVICE, ServiceLocator } from './services/service-locator';
// TODO: fix central direction wrong class names
'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());
ServiceLocator.register(MOVIE_SECTION_SERVICE, new MovieSectionService());
ServiceLocator.register(DATA_SERVICE, new DataService());

new AppComp().init();
