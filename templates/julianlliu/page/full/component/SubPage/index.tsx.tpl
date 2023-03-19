import React, { FC } from 'react';
import styles from './index.less';

interface SubPageProps {
  name: 'default';
}

const SubPage: FC<SubPageProps> = props => {
  const { name } = props;
  return (
    <div className={styles.title}>
      This is template content,just remove it ~!
      {name}
    </div>
  );
};

export default SubPage;
