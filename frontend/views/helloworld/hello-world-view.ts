import '!style-loader!css-loader!./hello-world-view.css';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import { customElement, html } from 'lit-element';
import { View } from '../../views/view';

@customElement('hello-world-view')
export class HelloWorldView extends View {
  name: string = '';

  render() {
    return html`
      <vaadin-text-field label="Your name modified" @value-changed="${this.nameChanged}"></vaadin-text-field>
      <vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>
    `;
  }
  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

  sayHello() {
    showNotification(`Hello ${this.name}`);
  }
}
