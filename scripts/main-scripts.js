import { AppComponent } from './components/application.componenet.js';
import { AnimationService } from './services/animation.service.js';
import { MediaService } from './services/media.service.js';
import { ANIMATION_SERVICE, MEDIA_SERVICE, ServiceLocator } from './services/service-locator.js';

'use strict';

ServiceLocator.register(MEDIA_SERVICE, new MediaService());
ServiceLocator.register(ANIMATION_SERVICE, new AnimationService());

document.addEventListener('DOMContentLoaded', function () {
    function setVolumeAfterAppend() {
        // TODO: this logic contains in volume component init method
        // now you have component hierarchy: AppComponent contains VolumeComp through several other comonents
        // what you need to do is to define init method on each component in this hierarchy
        // and call child init method in parent init method: from App to Volume - until this logic reached
        // of course init method must be called after render
        // this way we will remove query selector
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
