import {
  ADD_ROUTE,
  REMOVE_ROUTE,
  SET_CURRENT_NODE
} from '../actionTypes';

const initialTreeState = {
  route: '/main',
  title: 'main',
  nodes: [],
}

const initialNodeState = {
  currentNode: {
    route: '',
    title: '',
    nodesCount: 0
  }
}
