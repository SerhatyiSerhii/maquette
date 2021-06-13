import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';

export class FooterComp implements IComp {
    private socialMediaIcons: string[] = [
        `<svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 2.85104C28.8977 3.33827 27.7123 3.66309 26.4614 3.81699C27.7329 3.06381 28.7115 1.8624 29.1706 0.44255C27.9809 1.13829 26.6626 1.64963 25.2604 1.91913C24.1403 0.734746 22.5426 0 20.773 0C17.3737 0 14.6176 2.72551 14.6176 6.08648C14.6176 6.56236 14.6738 7.02548 14.7783 7.47512C9.66408 7.21909 5.12769 4.79287 2.09301 1.11063C1.55998 2.01062 1.26007 3.0638 1.26007 4.17585C1.26007 6.2886 2.34388 8.14887 3.99697 9.24461C2.98778 9.21411 2.03828 8.93397 1.20677 8.48433C1.20677 8.50277 1.20677 8.52972 1.20677 8.55596C1.20677 11.5084 3.32891 13.9673 6.14186 14.5268C5.62802 14.6673 5.08434 14.7453 4.52431 14.7453C4.12703 14.7453 3.7397 14.7006 3.36445 14.6332C4.14764 17.046 6.41974 18.8098 9.11187 18.8623C7.00536 20.492 4.35232 21.4679 1.46759 21.4679C0.969393 21.4679 0.481854 21.4395 0 21.3814C2.72695 23.1041 5.96276 24.1133 9.43665 24.1133C20.7559 24.1133 26.949 14.8375 26.949 6.79002C26.949 6.52619 26.9404 6.26378 26.9284 6.00421C28.1365 5.15244 29.1777 4.07869 30 2.85104Z" fill="url(#paint0_linear)" />
            <defs>
                <linearGradient id="paint0_linear" x1="4.58258" y1="0.930489" x2="26.1831" y2="22.5762" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" />
            </linearGradient>
            </defs>
        </svg>`,
        `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.1115 30.4209H8.14633C3.65538 30.4209 0 26.747 0 22.2307V8.19024C0 3.67391 3.65538 0 8.14633 0H22.1115C26.6024 0 30.2578 3.67391 30.2578 8.19024V22.2307C30.2578 26.747 26.6024 30.4209 22.1115 30.4209ZM8.14633 2.34007C4.93784 2.34007 2.32752 4.96446 2.32752 8.19024V22.2307C2.32752 25.4564 4.93784 28.0808 8.14633 28.0808H22.1115C25.32 28.0808 27.9303 25.4564 27.9303 22.2307V8.19024C27.9303 4.96446 25.32 2.34007 22.1115 2.34007H8.14633Z" fill="white" />
            <path d="M15.1463 23.4131C10.6554 23.4131 7 19.7391 7 15.2227C7 10.7062 10.6554 7.03223 15.1463 7.03223C19.6372 7.03223 23.2926 10.7062 23.2926 15.2227C23.2926 19.7391 19.6372 23.4131 15.1463 23.4131ZM15.1463 9.37235C11.9378 9.37235 9.32751 11.9968 9.32751 15.2227C9.32751 18.4485 11.9378 21.073 15.1463 21.073C18.3548 21.073 20.9651 18.4485 20.9651 15.2227C20.9651 11.9968 18.3548 9.37235 15.1463 9.37235Z" fill="white" />
            <path d="M24.7456 7.5293C25.7097 7.5293 26.4912 6.74339 26.4912 5.77393C26.4912 4.80446 25.7097 4.01855 24.7456 4.01855C23.7815 4.01855 23 4.80446 23 5.77393C23 6.74339 23.7815 7.5293 24.7456 7.5293Z" fill="white" />
        </svg>`,
        `<svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.71507 9.53953H6.13306V19.874H2.2999V9.53953H0V6.35969H2.2999V4.44383C2.30143 1.65511 3.41841 0 6.5869 0H9.19958V3.17984H7.4463C6.21279 3.17984 6.13306 3.65682 6.13306 4.54956V6.35969H9.19958L8.71507 9.53953Z" fill="white" />
        </svg>`
    ];

    render(): HTMLElement {
        const socialMediaArr = this.socialMediaIcons.map(iconElement => {
            const aTag = new ElementBuilder('a').setAttributes({ 'href': '#' }).setClasses('circle').build();

            aTag.innerHTML = iconElement;

            return new ElementBuilder('li').setChildren(aTag).build();
        });

        const socialMediaUL = new ElementBuilder('ul').setClasses('social-media').setChildren(...socialMediaArr).build();

        const policiesLIArr = ['privacy policy', 'cookie policy'].map((policy) => {
            const aTag = new ElementBuilder('a').setAttributes({ 'href': '#' }).build();

            aTag.textContent = policy;

            return new ElementBuilder('li').setChildren(aTag).build();;
        });

        const policyUL = new ElementBuilder('ul').setClasses('policy').setChildren(...policiesLIArr).build();
        const container = new ElementBuilder('container').setClasses('container').setChildren(policyUL, socialMediaUL).build();

        return new ElementBuilder('footer').setChildren(container).build();
    }
}
