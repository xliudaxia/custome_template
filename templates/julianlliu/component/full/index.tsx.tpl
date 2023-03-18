import React, { FC } from 'react';
import SubPage from './component/SubPage';
import styles from './index.less';

interface {{ compName }}Props {
  name: 'default';
}

const {{ compName }}: FC<{{ compName }}Props> = props => {
  const { name } = props;
  return (
    <div className={styles.title}>
      This is template content,just remove it ~!
      {name}
      <SubPage name="default" />
    </div>
  );
};

export default {{ compName }};
