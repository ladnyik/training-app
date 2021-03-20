import { Router } from '@vaadin/router';
import { routes } from './routes';
import { appStore } from './store/app-store';
import './styles/shared-styles';
import firebase from 'firebase';

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

var app = firebase.initializeApp({
	apiKey: "AIzaSyD_ClZV4paPW-DkYzeb4IrhsQwLXP38vDQ",
	authDomain: "monitor-dcde3.firebaseapp.com",
	databaseURL: "https://monitor-dcde3.firebaseio.com",
	projectId: "monitor-dcde3",
	storageBucket: "monitor-dcde3.appspot.com",
	messagingSenderId: "599266210703",
	appId: "1:599266210703:web:c836754716001d5f"
});
console.log(app);

window.addEventListener('vaadin-router-location-changed', (e) => {
	appStore.setLocation((e as CustomEvent).detail.location);
	const title = appStore.currentViewTitle;
	if (title) {
		document.title = title + ' | ' + appStore.applicationName;
	} else {
		document.title = appStore.applicationName;
	}
});
