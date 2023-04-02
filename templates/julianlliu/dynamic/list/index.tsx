
import * as React from 'react';
import { TablePanel, ActionRefType } from '@tencent/zstack-component';
import { useRef, useState } from 'react';
import { CustomEmpty } from '@src/components';
import { setLoadingToast } from '@src/routes/tix-monitor/utils';
import useColumns from './useColumns';
import request from './request';
import useOptions from './useOptions';
import { useCustomPageTotal } from '@src/routes/tix-monitor/components/common/useCustomPageTotal';

function __$ListName$__List() {
  const ref = useRef<ActionRefType>();
  const [query, setQuery] = useState({
    Offset: 0,
    Limit: 10,
    Resource: {
      OrgName: [],
      State: [],
    },
    Filter: {},
    By: undefined,
    Order: undefined,
  });
  const onQueryChange = (key, value, query) => {
    setQuery({
      ...query,
      Resource: { ...query.Resource, ...value },
    });
  };
  const [disableConditionalExp, setDisableConditionalExp] = useState(false);
  const [order, setOrder] = useState('AvailabilityRate-asc');
  const changeOrder = (value) => {
    const [filed, type] = value.split('-');
    setQuery({
      ...query,
      By: filed,
      Order: type,
    });
    setOrder(value);
  };
  const clickRefresh = () => {
    setQuery({
      ...query,
      Offset: 0,
      Limit: 10,
    });
    ref.current.reload();
  };
  const columns = useColumns();
  const { options, filterOptions } = useOptions({
    clickRefresh,
    changeOrder,
    order,
    query,
    disableConditionalExp,
  });

  const { PaginationOps, updataTotalCount } = useCustomPageTotal();
  const EnhanceRequest = async (query) => {
    const endToast = setLoadingToast();
    const resp = await request(query);
    endToast();
    setDisableConditionalExp(resp.TotalCount === 0);
    updataTotalCount(resp.TotalCount);
    return resp;
  };

  return (
    <div>
      <TablePanel
        columns={columns}
        filterColumns={filterOptions}
        searchKey="Resource"
        sortColumns={['AvailabilityRate', 'Warning', 'ResponseTime', 'LossRate', 'LatestDetectTime']}
        request={EnhanceRequest}
        query={query}
        onQueryChange={onQueryChange}
        paginationOps={PaginationOps}
        actionRef={ref}
        action={options}
        showLoading
        emptyText={<CustomEmpty />}
        recordKey="ID"
      />
    </div>
  );
}

export default __$ListName$__List;
