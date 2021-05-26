import { FooterComp } from './footer.component.js';
import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';

export class AppComponent { // TODO: rename to follow component name pattern
    init() {
        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(new WrapperComp().render());
        document.body.appendChild(new FooterComp().render());
    }
}
