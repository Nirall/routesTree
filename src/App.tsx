import React, {useState, useEffect} from 'react';
import { RootState } from './redux';

import {
  Link,
  useLocation
} from 'react-router-dom';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import { addRoute, removeRoute } from './redux/actionCreators';
import { flatTree } from './redux/helpers';

/*
const routesExample = {
  route: '/main',
  title: 'main',
  nodes: [
    {
      route: '/posts',
      title: 'posts',
      nodes: [
        {
          route: '/user',
          title: 'userPosts',
          nodes: []
        },
        {
          route: '/admin',
          title: 'adminPosts',
          nodes: [
            {
              route: '/1',
              title: '1stPost',
              nodes: []
            },
            {
              route: '/2',
              title: '2ndPost',
              nodes: []
            }
          ]
        }
      ]
    },
    {
      route: '/images',
      title: 'images',
      nodes: [
        {
          route: '/admin',
          title: 'adminImages',
          nodes: []
        }
      ]
    }
  ]
}
*/

const App = () => {
  // const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addRoute({
      parentPath: '/main/images',
      route: '/guest',
      title: 'guestImages',
    }));

    dispatch(removeRoute('/main/posts/admin/1'));
  }, [dispatch]);

  const state = useSelector<RootState>(({ routesTree }) => routesTree);
  console.log(state);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Page</h1>
    </div>
  )

  /*
  const proceedTree = (init: any, node: RouteObjType, fn: appliedFunc): void => {
    const { nodes } = node;
    const acc = fn(init, node);
    if (nodes.length !== 0) {
      nodes.forEach((node) => proceedTree(acc, node, fn));
    }
  }

  const flatTree = (tree: RouteObjType): Array<FormattedRouteType> => {
    const resultArr: Array<FormattedRouteType> = [];
    const flatFunction = (parentPath: string, node: RouteObjType) => {
      const { nodes, title, route } = node;
      resultArr.push({
        title,
        route: `${parentPath}${route}`,
        nodeCount: nodes.length
      });

      return `${parentPath}${route}`;
    }

    proceedTree('', tree, flatFunction);

    return resultArr;
  }

  const flattenTree = flatTree(routesExample);

  const matchNode = (searchPath: string, tree: RouteObjType): null | RouteObjType  => {
    let matchNode = null;

    const matchFunction = (parentPath: string, node: RouteObjType) => {
      const { route } = node;
      const currentPath = `${parentPath}${route}`;;
      if (currentPath === searchPath) {
        matchNode = node;
      }

      return currentPath;
    }

    proceedTree('', tree, matchFunction);

    return matchNode;
  }

  const addRouteToTree = (parentPath: string, node: RouteObjType, tree: RouteObjType): void => {
    const snapTree = JSON.parse(JSON.stringify(tree));
    const parentNode = matchNode(parentPath, snapTree);
    if (parentNode !== null) {
      parentNode.nodes.push(node);
    }
  }

  const removeRouteFromTree = (pathToRemove: string, tree: RouteObjType): void => {
    const snapTree = JSON.parse(JSON.stringify(tree));
    const parentPath = pathToRemove.split(/\/\w*$/i)[0];
    const parentNode = matchNode(parentPath, snapTree);
    const routeNode = matchNode(pathToRemove, snapTree);
    if (routeNode !== null && parentNode !== null) {
      const routeNodesArr = routeNode.nodes;
      parentNode.nodes = [...parentNode.nodes.filter((node) => node !== routeNode), ...routeNodesArr];
    }
  }

  removeRouteFromTree('/main/posts/admin', routesExample);

  addRouteToTree('/main/posts', {
    route: '/3',
    title: '3rdPost',
    nodes: [],
  }, routesExample);

  const content = flattenTree.map(({ route, title, nodeCount }) => {
    return (
      <div key={route}>
        <h3 key={`${route}_text`}>{`Route: ${route}___Title: ${title}___NodesCount: ${nodeCount}`}</h3>
        <Link to={route} key={`${route}_link`}>{route}</Link>
        <hr key={`${route}_line`} />
      </div>
    )
  });

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>{pathname}</h1>
      {matchNode(pathname, routesExample) ? content : '404'}
    </div>
  )
  */
}

export default App;
