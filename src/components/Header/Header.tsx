import React from 'react';
import { block } from 'bem-cn';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = ({ pathname }: {pathname: string}) => {
  const b = block('header');
  const parentPath = pathname.replace(/\/[a-z0-9]+$/, "");

  return (
    <div className={b()}>
      <h1 className={b('title')}>
        {pathname}
      </h1>
      <Link to={parentPath}>
        <button className={b('button')}>
          Go to the parent node
        </button>
      </Link>
    </div>
  )
}

export default Header