import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import '@vaadin/vaadin-app-layout';
import { AppLayoutElement } from '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import { customElement, html, query} from 'lit-element';
import { router } from '../../index';
import { ViewRoute, views, } from '../../routes';
import { appStore } from '../../store/app-store';
import { Layout } from '../view';
import styles from './main-view.css';
import firebase from 'firebase';
import * as UserLogin from '../../generated/UserLoginEndpoint';
import { routes } from '../../routes';


@customElement('main-view')
export class MainView extends Layout {
  static get styles() {
    return [CSSModule('lumo-typography'), CSSModule('lumo-color'), CSSModule('app-layout'), styles];
  }
 
  @query('#userAvatar')
  private userAvatar: any;

  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header slot="navbar" theme="dark">
          <vaadin-drawer-toggle></vaadin-drawer-toggle>
          <h1>${appStore.currentViewTitle}</h1>
          <vaadin-avatar id="userAvatar" img="images/logo.png" @click="${this.avatarClick}"></vaadin-avatar>
        </header>

        <div slot="drawer">
          <div id="logo">
            <img src="images/logo.png" alt="${appStore.applicationName} logo" />
            <span>${appStore.applicationName}</span>
          </div>
          <hr />
          <vaadin-tabs orientation="vertical" theme="minimal" .selected=${this.getSelectedViewRoute()}>
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <vaadin-tab>
                  <a href="${router.urlForPath(viewRoute.path)}" tabindex="-1">${viewRoute.title}</a>
                </vaadin-tab>
              `
            )}
          </vaadin-tabs>
        </div>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  firstUpdated(){
	
	console.log(routes);
	firebase.auth().onAuthStateChanged(
		(user) => this.UserLoginOut(user)
	);	       
  }

  UserLoginOut(user: any){
	
	console.log("auth state changed");
				
	if (user) {
		//let firebaseUser: firebase.User = user;  
		appStore.signedIn = true;
		var obj = JSON.parse(JSON.stringify(user));
		obj['accessToken'] = obj['stsTokenManager']['accessToken']; 			
	    UserLogin.userLogin(obj);
		this.userAvatar.img = user.photoURL;        			             
		
    } else {
	    appStore.signedIn = false;
		this.userAvatar.img = "images/logo.png";		    
    }
  } 

  avatarClick(){
	  
	if ( !appStore.signedIn){
	  var provider = new firebase.auth.GoogleAuthProvider();
	  firebase.auth().signInWithPopup(provider);
	  }
	else
    	firebase.auth().signOut();					
  }
	
  connectedCallback() {
    super.connectedCallback();
    this.reaction(
      () => appStore.location,
      () => {
        AppLayoutElement.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): ViewRoute[] {
    return views.filter((route) => route.title);
  }

  private getSelectedViewRoute(): number {
    return this.getMenuRoutes().findIndex((viewRoute) => viewRoute.path == appStore.location);
  }
}
