import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import './LinksList.scss';
import { RouteObjType } from '../../namespace';

const LinksList = ({ path, nodes }: { path: string, nodes: Array<RouteObjType> }) => {
  const b = block('links-list')
  const linksArr = nodes.length !== 0 ? nodes.map((node) => `${path}${node.route}`) : [];

  return (
    <div className={b()}>
      <h3 className={b('title')}>Nested routes</h3>
      {
        linksArr.map((link) => <Link key={link} to={link} className={b('link')}>{link}</Link>)
      }
    </div>
  )
}

export default LinksList;
