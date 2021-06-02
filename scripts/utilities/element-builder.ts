export class ElementBuilder<T extends HTMLElement = HTMLElement>  {
    private tagName: string;
    private classes: string[];
    private attributes: { [attr: string]: string };
    private children: HTMLElement[] = [];

    constructor(elementName: string) {
        this.tagName = elementName;
    }

    setClasses(...classes: string[]): this {
        this.classes = classes;

        return this;
    }

    setAttributes(obj: { [attr: string]: string }): this {
        this.attributes = obj;

        return this;
    }

    setChildren(...children: HTMLElement[]): this {
        this.children = children;

        return this;
    }

    build(): T {
        const element = document.createElement(this.tagName);

        if (this.classes != null) {
            for (let item of this.classes) {
                element.classList.add(item);
            }
        }

        for (let key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                element.setAttribute(key, this.attributes[key]);
            }
        }

        if (this.children != null) {
            for (let child of this.children) {
                element.appendChild(child);
            }
        }

        return element as T;
    }
}
