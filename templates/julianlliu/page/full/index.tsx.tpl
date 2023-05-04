import React, { FC, useState } from 'react';
import SubPage from './component/SubPage';
import { usePrevious } from './utils/hook';
import './index.less';

interface {{ compName }}Props {
  name: 'default';
}

const {{ compName }}: FC<{{ compName }}Props> = props => {
  const { name } = props;
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <div className='auto-generator-color'>
      This is template content,just remove it ~!
      {name}|{count}|{prevCount}
      <SubPage name="default" />
    </div>
  );
};

export default {{ compName }};
