import { FooterComp } from './footer.component.js';
import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';

export class AppComp { // TODO: rename to follow component name pattern     Renamed
    init() {
        const wrapperComp = new WrapperComp();

        document.body.appendChild(new HeaderComp(300).render());
        // document.body.appendChild(new WrapperComp().render());
        document.body.appendChild(wrapperComp.render());
        document.body.appendChild(new FooterComp().render());

        wrapperComp.init();
    }
}
