import * as React from 'react';
import { EnhanceTable } from '@src/components/enhance-table';
import { QueryProps, ColumnType ,ActionRefType,TableActionProps} from '@tencent/zstack-component';
import {  Text } from '@tencent/tea-component';
import { useCustomPageTotal } from '@src/routes/tix-monitor/components/common/useCustomPageTotal';
import { CustomExportNew } from '@src/components/CustomExportNew';
import { cloudApiRequest } from '@src/common/helpers';
__$useFilter1$__
__$searchAddon3$__

async function __$requestListApiName$__(data) {
  return cloudApiRequest('__$requestListApiName$__', data);
}
__$searchAddon4$__

export default function __$ListName$__() {
  __$selectable3$__
  const ref = React.useRef<ActionRefType>();
  const defaultQuery = { Offset: 0, Limit: 10, Filters: [] };
  const [query, setQuery] = React.useState(defaultQuery);
  const [IsListEmpty, setIsListEmpty] = React.useState(true);

  const refresh = React.useCallback(() => {
    ref.current?.reload();
    __$selectable4$__
  }, [ref]);

  __$useFilter2$__
  const columns: ColumnType<QueryProps, any>[] = [
    __$columnArray$__
  ];
  __$searchAddon2$__
  __$searchAddon5$__
  const options: TableActionProps<QueryProps, any>[] = [{
    left:[],
    right:[
__$searchAddon1$__
    ]
  }]

  const onQueryChange = (key, value, query) => {
    console.log('onQueryChange::', key, value, query);
    setQuery(query);
  };
  
  const { PaginationOps, updataTotalCount } = useCustomPageTotal(__$selectable5$__);
  const request = async (query) => {
    try{
      const reqData = query;
      const resp = await __$requestListApiName$__(reqData);
      console.log('__$requestListApiName$__:', resp, reqData);
      const { List, TotalCount } = resp;
      setIsListEmpty(TotalCount === 0);
      __$selectable4$__
      updataTotalCount(TotalCount);
      return {
        Data: List,
        Success: true,
        TotalCount,
      };
    }catch(error){
      console.log('__$requestListApiName$__ error:',error);
      window.aegisInstance.error(`Error __$requestListApiName$__: ${error.toString()}\nStack: ${error.stack}`);
      return {
        Data: [],
        Success: false,
        TotalCount:0,
      };
    }
  };
  return <EnhanceTable 
  __$selectable1$__
  __$selectable2$__
  defaultQuery={defaultQuery}
  onQueryChange={onQueryChange}
  queryConverted
  columns={columns} 
  action={options}
  __$useFilter3$__
  paginationOps={PaginationOps}
  request={request}
  recordKey="Id"
  actionRef={ref}
  />;
}
