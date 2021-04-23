import {
  ADD_ROUTE,
  REMOVE_ROUTE,
  SET_CURRENT_NODE
} from './actionTypes';

import { RouteObjType } from '../namespace';

type addRouteDataType = {
  parentPath: string;
  route: string;
  title: string;
}

const isAddRouteData = (data: unknown | addRouteDataType): data is addRouteDataType => {
  const hasProperties = Object.hasOwnProperty.call(data, 'parentPath')
    && Object.hasOwnProperty.call(data, 'route')
    && Object.hasOwnProperty.call(data, 'title')

  return hasProperties;
}

const addRoute = (data: addRouteDataType) => ({
  type: ADD_ROUTE,
  payload: data
})

const removeRoute = (pathToRemove: string) => ({
  type: REMOVE_ROUTE,
  payload: pathToRemove
})

const setCurrentNode = (node: RouteObjType) => ({
  type: SET_CURRENT_NODE,
  payload: node
})

export type TreeActionsTypes = ReturnType<typeof addRoute> | ReturnType<typeof removeRoute>

export type NodeActionsTypes = ReturnType<typeof setCurrentNode>;

export { addRoute, removeRoute, isAddRouteData, setCurrentNode };
