import React, { FC } from 'react';
import ConfirmDom from '@src/components/ConfirmDom';
import { t } from '@tencent/tea-app/lib/i18n';
import './index.less';

interface {{ compName }}Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClose: (visible: boolean) => void;
}

/**
 * You can describle the component here
 */
const {{ compName }}: FC<{{ compName }}Props> = props => {
  const { visible, setVisible, onClose } = props;
  return (
    <ConfirmDom
      visible={visible}
      submit={() => {
        onClose(false);
        setVisible(false);
      }}
      cancel={() => {
        setVisible(false);
      }}
      subTitle={t('subTitle')}
      title={t('确定关闭吗？')}
    />
  );
};

export default {{ compName }};
