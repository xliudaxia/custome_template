import { ServiceCodeTextMap } from '@src/common/constants';
import { __$requestListApiName$__ } from '@src/routes/tix-monitor/services';
import { convertQueryData } from '@src/routes/tix-monitor/utils';
import { message } from '@tencent/tea-component';

const request = async (query) => {
  const reqData = convertQueryData(query);
  const resp = await __$requestListApiName$__(reqData);
  console.log('__$requestListApiName$__:', resp, reqData);
  if (!resp.Error) {
    return {
      Data: resp.List,
      Success: true,
      TotalCount: resp.TotalCount,
    };
  }
  message.error({ content: ServiceCodeTextMap[resp.Error.Code] });
  return {
    Data: [],
    Success: false,
    TotalCount: 0,
  };
};
export default request;
