import { FooterComp } from './footer.component';
import { HeaderComp } from './header.component';
import { WrapperComp } from './wrapper.component';

export class AppComp {
    init(): void {
        const wrapper: WrapperComp = new WrapperComp();

        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(wrapper.render());
        document.body.appendChild(new FooterComp().render());

        wrapper.init();
    }
}
