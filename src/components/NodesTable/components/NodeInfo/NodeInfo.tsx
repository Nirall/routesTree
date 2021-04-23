import React from 'react';
import { block } from 'bem-cn';

import './NodeInfo.scss';

type Props = {
  route: string;
  title: string;
  nodeCount: number | string;
  onClickHandler?: ((value: string) => void) | null;
  headlines?: boolean
}

const NodeInfo = ({ route, title, nodeCount, onClickHandler=null, headlines } : Props) => {
  const handleButtonClick = () => {
    if (onClickHandler !== null) onClickHandler(route);
  }

  const b = block('node-info');
  return (
    <div className={headlines ? b({bolded: true}) : b()}>
      <div className={b('info', {size: 'long'})}>
        {route}
      </div>
      <div className={b('info', {size: 'medium'})}>
        {title}
      </div>
      <div className={b('info', {centered: true})}>
        {nodeCount}
      </div>
      {headlines
        ? <div className={b('button-placeholder')} />
        : (
          <button className={b('button')} onClick={handleButtonClick}>
            delete
        </button>)}
    </div>
  )
}

export default NodeInfo;