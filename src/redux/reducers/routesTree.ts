import {
  ADD_ROUTE,
  REMOVE_ROUTE,
} from '../actionTypes';
import { matchNode } from '../helpers';
import { isAddRouteData, TreeActionsTypes } from '../actionCreators';

const initialState = {
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

/*
const initialState = {
  route: '/main',
  title: 'main',
  nodes: [],
}
*/

const routesTree = (state = initialState, action: TreeActionsTypes) => {
  switch (action.type) {
    case ADD_ROUTE:
      if (isAddRouteData(action.payload)) {
        const snapTree = JSON.parse(JSON.stringify(state));
        const { parentPath, route, title } = action.payload;
        const parentNode = matchNode(parentPath, snapTree);

        if (parentNode !== null) {
          parentNode.nodes.push({
            route,
            title,
            nodes: []
          });

          return snapTree;
        }
      }

      return state;

    case REMOVE_ROUTE:
      if (typeof action.payload === 'string') {
        const pathToRemove = action.payload;
        const snapTree = JSON.parse(JSON.stringify(state));
        const parentPath = pathToRemove.split(/\/\w*$/i)[0];
        const parentNode = matchNode(parentPath, snapTree);
        const routeNode = matchNode(pathToRemove, snapTree);
        if (routeNode !== null && parentNode !== null) {
          const routeNodesArr = routeNode.nodes;
          parentNode.nodes = [...parentNode.nodes.filter((node) => node !== routeNode), ...routeNodesArr];

          return snapTree;
        }
      }

      return state;

    default:
      return state
  }
}

export { routesTree };