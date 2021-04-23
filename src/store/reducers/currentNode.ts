import { Reducer } from 'redux';

import { SET_CURRENT_NODE } from '../actionTypes';
import { NodeActionsTypes } from '../actionCreators';
import { RouteObjType } from '../../namespace';

const initialState = {
  route: '',
  title: '',
  nodes: [],
}

const currentNode: Reducer<RouteObjType, NodeActionsTypes> = (state = initialState, action): RouteObjType => {
  switch (action.type) {
    case SET_CURRENT_NODE:
      return {
        ...initialState,
        ...action.payload
      }
    default:
      return state;
  }
}

export {currentNode}
