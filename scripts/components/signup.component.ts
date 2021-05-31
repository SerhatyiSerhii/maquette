import {ElementBuilder} from '../utilities/element-builder';

export class SignUpComp {
    render() {
        const textInput = new ElementBuilder('input').setAttributes({ 'type': 'text', 'name': 'email', 'placeholder': 'enter your email', 'autocomplete': 'off' }).build();
        const submitInput = new ElementBuilder('input').setAttributes({ 'type': 'submit', 'value': 'submit' }).build();
        const emailSpace = new ElementBuilder('div').setClasses('email-space').setChildren(textInput, submitInput).build();
        const form = new ElementBuilder('form').setChildren(emailSpace).build();

        const sighUpTitle = new ElementBuilder('h2').build();
        sighUpTitle.textContent = 'Sign up to receive the latest updates and news'

        const appeal = new ElementBuilder('div').setClasses('appeal').setChildren(sighUpTitle, form).build();
        const container = new ElementBuilder('container').setChildren(appeal).build();

        return new ElementBuilder('section').setClasses('sign-up').setChildren(container).build();
    }
}
