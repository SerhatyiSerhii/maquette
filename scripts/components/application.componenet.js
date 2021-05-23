import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';
import { FooterComp } from './footer.component.js';

export class AppComponent {
    init() {
        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(new WrapperComp().render());
        document.body.appendChild(new FooterComp().render());
    }
}