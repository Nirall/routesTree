import React from 'react';
import { block } from 'bem-cn';

import './Footer.scss';

const Header = ({ text }: {text: string}) => {
  const b = block('footer');

  return (
    <div className={b()}>
      <h3 className={b('text')}>
        {text}
      </h3>
    </div>
  )
}

export default Header