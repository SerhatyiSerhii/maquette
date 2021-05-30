import { FooterComp } from './footer.component.js';
import { HeaderComp } from './header.component.js';
import { WrapperComp } from './wrapper.component.js';

export class AppComp {
    init() {
        const wrapper = new WrapperComp();

        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(wrapper.render());
        document.body.appendChild(new FooterComp().render());

        wrapper.init();
    }
}
