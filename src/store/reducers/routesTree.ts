import { Reducer } from 'redux';

import { ADD_ROUTE, REMOVE_ROUTE } from '../actionTypes';
import { isAddRouteData, TreeActionsTypes } from '../actionCreators';
import { matchNode } from '../../helpers';
import { RouteObjType } from '../../namespace';

const initialState = {
  route: '/main',
  title: 'main',
  nodes: [],
}

const routesTree: Reducer<RouteObjType, TreeActionsTypes> = (state = initialState, action): RouteObjType => {
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
          let routeNodesArr = routeNode.nodes;
          routeNodesArr = routeNodesArr.filter((routeNode) => {
            return parentNode.nodes.every((parentNode) => {
              return parentNode.route !== routeNode.route;
            })
          });

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
