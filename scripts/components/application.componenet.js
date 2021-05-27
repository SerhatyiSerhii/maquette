import { FooterComp } from './footer.component.js';
import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';

export class AppComp {
    init() {
        const wrapperComp = new WrapperComp();

        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(wrapperComp.render());
        document.body.appendChild(new FooterComp().render());

        wrapperComp.init();
    }
}
