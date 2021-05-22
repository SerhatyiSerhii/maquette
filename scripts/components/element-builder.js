export class ElementBuilder {
    #tagName;
    #classes;
    #attributes;
    #children = [];

    constructor(elementName) {
        this.#tagName = elementName;
    }

    setClasses(...classes) {
        this.#classes = classes;

        return this;
    }

    setAttributes(obj) {
        this.#attributes = obj;

        return this;
    }

    setChildren(...children) {
        this.#children = children;

        return this;
    }

    build() {
        const element = document.createElement(this.#tagName);

        if (this.#classes != null) {
            for (let item of this.#classes) {
                element.classList.add(item);
            }
        }

        for (let key in this.#attributes) {
            if (this.#attributes.hasOwnProperty(key)) {
                element.setAttribute(key, this.#attributes[key]);
            }
        }

        if (this.#children != null) {
            for (let child of this.#children) {
                element.appendChild(child);
            }
        }

        return element;
    }
}