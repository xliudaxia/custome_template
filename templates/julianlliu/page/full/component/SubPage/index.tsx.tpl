import React, { FC } from 'react';
import './index.less';

interface SubPageProps {
  name: 'default';
}

const SubPage: FC<SubPageProps> = props => {
  const { name } = props;
  return (
    <div className='auto-generator-color'>
      This is template content,just remove it ~!
      {name}
    </div>
  );
};

export default SubPage;
