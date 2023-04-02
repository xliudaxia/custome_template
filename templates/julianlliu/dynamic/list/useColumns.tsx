import { MonitorRoute } from '@src/routes/tix-monitor/constants';
import { SearchRoute } from '@src/routes/tix-search/constants';
import { useHistory } from '@tea/app';
import { Button, Tag, Text } from '@tencent/tea-component';
import { QueryProps, ColumnType } from '@tencent/zstack-component';
import React from 'react';

const useColumns = () => {
  const history = useHistory();
  const columns: ColumnType<QueryProps, any>[] = [
    __$columnArray$__
  ];
  return columns;
};

export default useColumns;
