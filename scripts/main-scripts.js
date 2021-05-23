import { AppComponent } from './components/application.componenet.js';
import { AnimationService } from './services/animation.service.js';
import { MediaService } from './services/media.service.js';
import { ANIMATION_SERVICE, MEDIA_SERVICE, ServiceLocator } from './services/service-locator.js';

'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());

document.addEventListener('DOMContentLoaded', function () {
    function setVolumeAfterAppend() {
        var volume = document.getElementsByClassName('volume');

        for (var item of volume) {
            var volumeHandle = item.querySelector('.volume-handle');
            var volumeLable = item.querySelector('.label');

            volumeHandle.style.width = (item.clientWidth - volumeLable.clientWidth) + 'px';
        }
    }

    new AppComponent().init();

    setVolumeAfterAppend();
});
