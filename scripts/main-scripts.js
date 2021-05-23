import { AnimationService } from './services/animation.service.js';
import { MediaService } from './services/media.service.js';
import { ServiceLocator, MEDIA_SERVICE, ANIMATION_SERVICE} from './services/service-locator.js';
import {AppComponent} from './components/application.componenet.js';
// TODO: files named wrong!!! words component and service should be separated with the dot!!!    Corrected
'use strict';

// TODO: are them still constants if you define them every time you need them? define and export along side service locator and import together     Corrected
// const MEDIA_SERVICE = 'mediaServiceKey';
// const ANIMATION_SERVICE = 'animationServiceKey';

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

    // TODO: create component AppComponent and move this there to method init    Corrected
    // document.body.appendChild(new HeaderComp(300).render());
    // document.body.appendChild(new WrapperComp().render());
    // document.body.appendChild(new FooterComp().render());

    new AppComponent().init();

    setVolumeAfterAppend();
});
