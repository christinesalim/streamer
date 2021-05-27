//Manage history ourselves so that we can read it when we need
//it instead of having to pass it to action creators to 
//do programmatic navigation
import { createBrowserHistory } from 'history';

export default createBrowserHistory();