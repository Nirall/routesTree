import React from 'react';
import { block } from 'bem-cn';

import './NodesTable.scss';
import { RouteObjType } from '../../namespace';
import NodeInfo from './components/NodeInfo/NodeInfo';

const NodesTable = (
    { nodesData, handleDeleteButtonClick }: {
      nodesData: Array<RouteObjType>,
      handleDeleteButtonClick: ((value: string) => void)
    }
  ) => {
    const b = block('nodes-table');
    let table: Array<JSX.Element> = [];
    if (nodesData.length !== 0) {
      table = nodesData.map(({ route, title, nodes }) => {
        return (
          <NodeInfo key={route} route={route} title={title} nodeCount={nodes.length} onClickHandler={handleDeleteButtonClick}/>
        )
      });
    }

    table.unshift(<NodeInfo key='headlines' route='Route' title='Title' nodeCount='Nodes count' headlines/>)

    return (
      <div className={b()}>
        <h3 className={b('title')}>All routes</h3>
        {table}
      </div>
    );
}

export default NodesTable;