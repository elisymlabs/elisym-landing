import { Route, Switch } from 'wouter';
import { App } from './App';
import { Blog } from './Blog';
import { BlogPost } from './BlogPost';

export function Router() {
  return (
    <Switch>
      <Route path="/" component={App} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug">
        {(params) => <BlogPost slug={params.slug} />}
      </Route>
    </Switch>
  );
}
