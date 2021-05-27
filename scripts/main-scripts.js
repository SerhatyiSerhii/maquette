import { AppComp } from './components/application.componenet.js';
import { AnimationService } from './services/animation.service.js';
import { MediaService } from './services/media.service.js';
import { ANIMATION_SERVICE, MEDIA_SERVICE, ServiceLocator } from './services/service-locator.js';

'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());

document.addEventListener('DOMContentLoaded', function () {
    new AppComp().init();
});
