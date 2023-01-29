import { store } from 'core/store';
import { initRouter } from 'core/router/init';
import appRouter from 'core/router';
import { initApp } from 'services/login';
import '../styles/styles.css';
import './register';

document.addEventListener('DOMContentLoaded', () => {
  initRouter(appRouter, store);
  store.dispatch(initApp);
});
