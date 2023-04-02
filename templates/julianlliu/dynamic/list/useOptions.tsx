import { TableActionProps, QueryProps } from '@tencent/zstack-component';
import * as React from 'react';
import { Select } from '@tencent/tea-component';
import { CustomExportNew } from '@src/components/CustomExportNew';
import { DescribeAvailabilityDownloadSiteList } from '@src/routes/tix-monitor/services';
import { convertQueryData } from '@src/routes/tix-monitor/utils';
import useFilterOptions from './useFilterOptions';

const dropdownOptions = [
  {
    text: '按可用率倒序',
    value: 'AvailabilityRate-desc',
  },
  {
    text: '按可用率顺序',
    value: 'AvailabilityRate-asc',
  },
  {
    text: '按告警次数倒序',
    value: 'Warning-desc',
  },
  {
    text: '按告警次数顺序',
    value: 'Warning-asc',
  },
  {
    text: '按整体性能倒序',
    value: 'ResponseTime-desc',
  },
  {
    text: '按整体性能顺序',
    value: 'ResponseTime-asc',
  },
  {
    text: '按丢包率倒序',
    value: 'LossRate-desc',
  },
  {
    text: '按丢包率顺序',
    value: 'LossRate-asc',
  },
  {
    text: '按最新探测时间倒序',
    value: 'LatestDetectTime-desc',
  },
  {
    text: '按最新探测时间顺序',
    value: 'LatestDetectTime-asc',
  },
];
const useOptions = ({ clickRefresh, changeOrder, order, query, disableConditionalExp }) => {
  const { filterOptions, filterOptionsRes } = useFilterOptions();
  const [exportTableColumn, setExportTableColumn] = React.useState([
    __$exportTableColumnInitData$__
  ]);

  const options: TableActionProps<QueryProps, any>[] = [
    {
      left: [
        {
          type: 'customNode',
          content: (
            <Select
              listWidth={120}
              style={{ width: 120 }}
              appearance="button"
              options={dropdownOptions}
              value={order}
              onChange={changeOrder}
            />
          ),
        },
      ],
      right: [
        {
          type: 'tagSearch',
          tagSearchKey: 'common',
          placeholder: '关键词用“|”分割，过滤标签用回车键分割',
          attributes: [
           __$tagSearchAttributes$__
          ],
        },
        {
          type: 'button',
          icon: 'refresh',
          withQueryAndSelectedKeys: true,
          func: clickRefresh,
        },
        // 下载按钮
        {
          type: 'customNode',
          // icon: 'download',
          content: (
            <CustomExportNew
              columns={exportTableColumn}
              queryParams={convertQueryData(query, false)}
              disableConditionalExp={disableConditionalExp}
              action={async (exportAll, fields, queryParams, FileId) =>
                DescribeAvailabilityDownloadSiteList({
                  ...(exportAll ? {} : queryParams),
                  ExportField: fields,
                  FullExport: true,
                  FileId,
                })
              }
              onChange={(columns) => {
                setExportTableColumn(columns);
              }}
            />
          ),
        },
      ],
    },
  ];

  return { options, filterOptions };
};

export default useOptions;
