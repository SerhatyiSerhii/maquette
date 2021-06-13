import { AppComp } from './components/application.componenet';
import { AnimationService } from './services/animation.service';
import { DataService } from './services/data.service';
import { MediaService } from './services/media.service';
import { MovieSectionService } from './services/movie-section.service';
import { ServiceLocator, Services } from './services/service-locator';

'use strict';

ServiceLocator.register(Services.MEDIA_SERVICE, new MediaService());
ServiceLocator.register(Services.ANIMATION_SERVICE, new AnimationService());
ServiceLocator.register(Services.MOVIE_SECTION_SERVICE, new MovieSectionService());
ServiceLocator.register(Services.DATA_SERVICE, new DataService());

new AppComp().init();
