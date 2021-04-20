import React from 'react';

type RouteObjType = {
  route: string;
  title: string;
  nodes: Array<RouteObjType>;
}

type FormattedRouteType = {
  route: string;
  title: string;
}

const routesExample = {
  route: '/',
  title: 'home',
  nodes: [
    {
      route: 'posts/',
      title: 'posts',
      nodes: [
        {
          route: 'user/',
          title: 'userPosts',
          nodes: []
        },
        {
          route: 'admin/',
          title: 'adminPosts',
          nodes: []
        }
      ]
    },
    {
      route: 'images/',
      title: 'images',
      nodes: [
        {
          route: 'admin/',
          title: 'adminImages',
          nodes: []
        }
      ]
    }
  ]
}

const App = () => {
  const resultRoutes: Array<FormattedRouteType> = [];
  const createArr = (parentRoute: string, routeObj: RouteObjType): void => {
      const { nodes, title, route } = routeObj;
      resultRoutes.push({
        title,
        route: `${parentRoute}${route}`,
      });

      if (nodes.length !== 0) {
        nodes.forEach((node) => createArr(`${parentRoute}${route}`, node))
      }
  }

  createArr('', routesExample);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Routing test</h1>
        {resultRoutes.map(({ route, title }) => <h3 key={route}>{`Route: ${route}___________Title: ${title}`}</h3>)}
      </header>
    </div>
  );
}

export default App;
