import { ElementBuilder } from '../utilities/element-builder';
import { SliderFrameComp } from './slider-frame.component';

export class SliderComp {
    private content;
    private arrowLeft = `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 41.5L2 21.5M2 21.5L28 1M2 21.5L60 21.5" stroke-width="2" /></svg>`;
    private arrowRight = `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 41.5L58 21.5M58 21.5L32 1M58 21.5L0 21.5" stroke-width="2" /></svg>`;
    private currentIndex;
    private maxIndex;
    private framesLine;
    private sliderFrameComponent = [];

    constructor(content, initialIndex) {
        this.content = content;
        this.currentIndex = initialIndex;
        this.maxIndex = this.content.length - 1;
    }

    private createArrow(arrowDirection, svg) {
        const arrow = new ElementBuilder('a').setClasses(arrowDirection, 'arrow').setAttributes({ 'href': '#' }).build();

        arrow.innerHTML = svg;

        return arrow;
    }

    private settingTranslateX() {
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
        } else if (this.currentIndex >= this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }
        this.framesLine.style.transform = `translateX(${-this.currentIndex * 100}%)`;
    }

    init() {
        for (let slideFrameItem of this.sliderFrameComponent) {
            slideFrameItem.init();
        }
    }

    render() {
        const sliderFrames = this.content.map((frameOptions) => {
            const slide = new SliderFrameComp(frameOptions);

            this.sliderFrameComponent.push(slide);

            return slide.render();
        });

        this.framesLine = new ElementBuilder('ul').setChildren(...sliderFrames).build();

        const arrowLeft = this.createArrow('arrow-left', this.arrowLeft);
        const arrowRight = this.createArrow('arrow-right', this.arrowRight);

        arrowLeft.addEventListener('click', (event) => {
            event.preventDefault();

            this.currentIndex--;
            this.settingTranslateX();
        });

        arrowRight.addEventListener('click', (event) => {
            event.preventDefault();

            this.currentIndex++;
            this.settingTranslateX();
        });

        this.settingTranslateX();

        const slidesWrapper = new ElementBuilder('div').setClasses('slides-wrapper').setChildren(arrowLeft, arrowRight, this.framesLine).build();
        const container = new ElementBuilder('div').setClasses('container').setChildren(slidesWrapper).build();
        const section = new ElementBuilder('section').setClasses('slider').setChildren(container).build();

        return section;
    }
}
