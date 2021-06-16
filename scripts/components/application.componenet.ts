import { FooterComp } from './footer.component';
import { HeaderComp } from './header.component';
import { WrapperComp } from './wrapper.component';

export class AppComp {
    public init(): void {
        document.body.appendChild(new HeaderComp(300).render());
        document.body.appendChild(new WrapperComp().render());
        document.body.appendChild(new FooterComp().render());
    }
}
