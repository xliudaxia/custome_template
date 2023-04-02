import { ServiceCodeTextMap } from '@src/common/constants';
import { __$listFilterOptionsApi$__ } from '@src/routes/tix-monitor/services';
import { message } from '@tencent/tea-component';
import { useRequest } from 'ahooks';
import { useState } from 'react';

function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const [filterOptionsRes, setFilterOptionsRes] = useState<any>({});

  useRequest(__$listFilterOptionsApi$__, {
    onSuccess(res, params) {
      console.log('__$listFilterOptionsApi$__:', res, params);
      if (!res.Error) {
        const options = [];
        for (const key in res) {
          if (Array.isArray(res[key])) {
            options.push({
              column: key,
              tagSearch: true,
              searchable: true,
              type: 'multiple',
              options: res[key].map((item) => ({ text: item, value: item })),
            });
          }
        }
        setFilterOptions(options);
        setFilterOptionsRes(res);
      } else {
        message.error({ content: ServiceCodeTextMap[res.Error.Code] });
      }
    },
  });
  return { filterOptions, filterOptionsRes };
}

export default useFilterOptions;
