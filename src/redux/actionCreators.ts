import {
  ADD_ROUTE,
  REMOVE_ROUTE,
  SET_CURRENT_NODE
} from './actionTypes';

type addRouteDataType = {
  parentPath: string;
  route: string;
  title: string;
}

const isAddRouteData = <T>(data: T | addRouteDataType): data is addRouteDataType => {
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

export type TreeActionsTypes = ReturnType<typeof addRoute> | ReturnType<typeof removeRoute>

export { addRoute, removeRoute, isAddRouteData };
