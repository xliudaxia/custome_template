import { ServiceCodeTextMap } from '@src/common/constants';
import { message } from '@tencent/tea-component';
import { useState,useEffect } from 'react';
import { cloudApiRequest } from '@src/common/helpers';

async function __$listFilterOptionsApi$__(data) {
  return cloudApiRequest('__$listFilterOptionsApi$__', data);
}

const formatOptionsRes = (res) => {
  const result = {};
  for (const key in res) {
    if (Array.isArray(res[key])) {
      if (!result[key]) {
        result[key] = [];
      }
      res[key].forEach((item) => {
        result[key].push({
          key: item,
          name: item,
        });
      });
    }
  }
  return result;
};

export default function useFilterOptions() {
  const [filterColumns, setFilterColumns] = useState<any>([]);
  const [filterOptions, setFilterOptions] = useState<any>({});

  const getFilters = async () => {
    try{
      const res = await __$listFilterOptionsApi$__({})
      console.log('__$listFilterOptionsApi$__:', res);
      if (!res.Error) {
        const options:any[] = [];
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
        setFilterColumns(options);
        setFilterOptions(formatOptionsRes(res));
      } else {
        message.error({ content: ServiceCodeTextMap[res.Error.Code] });
      }
    }catch(error){
      console.log('__$listFilterOptionsApi$__ error:',error);
      window.aegisInstance.error(`Error __$listFilterOptionsApi$__: ${error.toString()}\nStack: ${error.stack}`);
    }
  }

  useEffect(()=>{
    getFilters()
  },[])
  return { filterColumns, filterOptions };
}
