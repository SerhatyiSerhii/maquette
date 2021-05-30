import { FooterComp } from './footer.component.js';
import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';

export class AppComp {
    #wrapper; // TODO: what for?

    init() {
        this.#wrapper = new WrapperComp();

        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(this.#wrapper.render());
        document.body.appendChild(new FooterComp().render());

        this.#wrapper.init();
    }
}
