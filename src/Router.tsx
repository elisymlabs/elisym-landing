import { Route, Switch } from 'wouter';
import { App } from './App';

// Add new page components and routes here as the site grows.
export function Router() {
  return (
    <Switch>
      <Route path="/" component={App} />
      {/* Future routes:
      <Route path="/about" component={About} />
      <Route path="/docs" component={Docs} />
      */}
    </Switch>
  );
}
