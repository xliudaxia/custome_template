// 网站可用性-监测站点模板
module.exports = {
    inputParams: [
        {
            type:'text',
            name: "ListName",
            message: "列表名称，例：MonitorSite:"
        },
        {
            type:'text',
            name:"requestListApiName",
            message:"请求列表的接口名称，例：DescribeAvailabilityMonitorSiteList："
        },
        {
            type:'number',
            name:"columns",
            message:"列表有多少列，例：5:"
        },
        {
            type:'confirm',
            name:'useFilter',
            message:"是否有过滤项?",
            initial: true
        },
        {
            type:'confirm',
            name:'selectable',
            message:"是否selectable?",
            initial: false
        },
        {
            type:'confirm',
            name:'searchAddon',
            message:"是否有搜索框？",
            initial: false
        }
    ],
    getDynamicInput(inputValues){
        const DynamicInput = []
        const columns = inputValues.columns
        if(columns){
            for(let i=0;i<columns;i++){
                DynamicInput.push({name:`columnsKey${i}`,message:`第${i+1}列的key:`,type:'text'})
                DynamicInput.push({name:`columnsHeader${i}`,message:`第${i+1}列的header:`,type:'text'})
                DynamicInput.push({name:`columnsRender${i}`,message:`第${i+1}列的render类型:普通文字text、跳转链接link、两行two`,type:'text'})
            }
        }
        if(inputValues.useFilter){
            DynamicInput.push({
                type:'text',
                name:'listFilterOptionsApi',
                message:"请求列表筛选项的接口名称，例：DescribeAvailabilityListFilterOptions："
            })
            DynamicInput.push({
                type:'list',
                name:"filterKeys",
                message:"哪些Key有过滤，逗号分隔,例：OrgName,State:"
            })
            DynamicInput.push({
                type:'list',
                name:"filterKeysName",
                message:"filterKeys对应的过滤名称,例：机构名称,可用状态:"
            })
        }
        if(inputValues.searchAddon){
            DynamicInput.push({
                type:'text',
                name:'downloadListApi',
                message:'下载列表api:'
            })
        }
        return DynamicInput
    },
    handleDynamicValue(dynamicInputValues,inputValues){
        const dynamicReplaceValues = JSON.parse(JSON.stringify(dynamicInputValues))
        const columns = inputValues.columns
        if(columns){
            const columnsAry = this.getColumnsAry(dynamicInputValues,inputValues,columns)
            dynamicReplaceValues.columnArray = columnsAry.join(',')
            const exportTableColumnInitData = this.getExportTableColumnInitData(dynamicInputValues,inputValues,columns)
            dynamicReplaceValues.exportTableColumnInitData = exportTableColumnInitData.join(',')
        }
        const tagSearchAttributes = this.getTagSearchAttributes(dynamicInputValues,inputValues,columns)
        dynamicReplaceValues.tagSearchAttributes = tagSearchAttributes.join(',')

        dynamicReplaceValues.useFilter1 = inputValues.useFilter? 'import useFilterOptions from "./useFilterOptions"':''
        dynamicReplaceValues.useFilter2 = inputValues.useFilter? `const { filterColumns, filterOptions } = useFilterOptions()`:''
        dynamicReplaceValues.useFilter3 = inputValues.useFilter? 'filterColumns={filterColumns}':''

        dynamicReplaceValues.selectable1 = inputValues.selectable? 'selectable':''
        dynamicReplaceValues.selectable2 = inputValues.selectable? 'onSelectChange={(selectedKeys) => setSelectKeys(selectedKeys)}':''
        dynamicReplaceValues.selectable3 = inputValues.selectable? 'const [selectKeys, setSelectKeys] = React.useState([]);':''
        dynamicReplaceValues.selectable4 = inputValues.selectable? 'ref.current?.clearSelected();setSelectKeys([])':''
        dynamicReplaceValues.selectable5 = inputValues.selectable? 'selectKeys':''

        if(inputValues.searchAddon){
            const searchAddonRender = this.getSearchAddon(dynamicInputValues,inputValues)
            dynamicReplaceValues.searchAddon1 = searchAddonRender.searchAddon1
            dynamicReplaceValues.searchAddon2 = searchAddonRender.searchAddon2
            dynamicReplaceValues.searchAddon3 = searchAddonRender.searchAddon3
            dynamicReplaceValues.searchAddon4 = searchAddonRender.searchAddon4
            dynamicReplaceValues.searchAddon5 = searchAddonRender.searchAddon5
        }
        

        return dynamicReplaceValues
    },
    getColumnsAry(dynamicInputValues,inputValues,columns){
        const columnsAry = []
        for(let i=0;i<columns;i++){
            const columnsRender = dynamicInputValues[`columnsRender${i}`]
            const columnsKey = dynamicInputValues[`columnsKey${i}`]
            const columnsHeader = dynamicInputValues[`columnsHeader${i}`]

            if(columnsRender==='text'){
                columnsAry.push(`
                    {
                        key: '${columnsKey}',
                        header: '${columnsHeader}',
                        render(row) {
                            return (
                            <Text tooltip={row.${columnsKey}} overflow>
                                {row.${columnsKey} || '--'}
                            </Text>
                            );
                        },
                        }
                `)
            }else if(columnsRender==='link'){
                columnsAry.push(`
                    {
                        key: '${columnsKey}',
                        header: '${columnsHeader}',
                        render(row) {
                        return (
                            <Text
                            className="cursor-pointer"
                            theme="primary"
                            overflow
                            tooltip={row.${columnsKey}}
                            align="left"
                            onClick={() => {
                                console.log(row)
                            }}
                            >
                            {row.${columnsKey} || '--'}
                            </Text>
                        );
                        },
                    }
                `)
            }else if(columnsRender==='two'){
                columnsAry.push(`
                {
                    key: '${columnsKey}',
                    header: (
                        <Text style={{ marginLeft: 10 }}>
                        ${columnsHeader}
                        </Text>
                      ),
                      render: (record) => (
                        <div>
                            <Text
                            style={{ marginLeft: 10 }}
                            overflow
                            tooltip={record.${columnsKey}}
                            >
                                {record.${columnsKey} || '--'}
                            </Text>
                            <br />
                            <Text
                            style={{ marginLeft: 10 }}
                            overflow
                            tooltip={record.${columnsKey}}
                            >
                                {record.${columnsKey} || '--'}
                            </Text>
                        </div>
                      ),

                }
                `)
            }
        }
        return columnsAry
    },
    getExportTableColumnInitData(dynamicInputValues,inputValues,columns){
        const ExportTableColumnInitData = []
        for(let i=0;i<columns;i++){
            const columnsRender = dynamicInputValues[`columnsRender${i}`]
            const columnsKey = dynamicInputValues[`columnsKey${i}`]
            const columnsHeader = dynamicInputValues[`columnsHeader${i}`]
            ExportTableColumnInitData.push(`
            { key: '${columnsKey}', header: '${columnsHeader}' }
            `)
        }
        return ExportTableColumnInitData
    },
    getTagSearchAttributes(dynamicInputValues,inputValues,columns){
        const TagSearchAttributes = []
        const filterKeys = dynamicInputValues.filterKeys
        if(filterKeys){
            filterKeys.forEach((item,index)=>{
                TagSearchAttributes.push(`
                {
                    type: ['multiple', { searchable: true }],
                    key: '${item}',
                    name: '${dynamicInputValues.filterKeysName[index]}',
                    values: filterOptions.${item} || [],
                  }
                `)
            })
        }
        return TagSearchAttributes
    },
    getSearchAddon(dynamicInputValues,inputValues){

        const TagSearchAttributes = this.getTagSearchAttributes(dynamicInputValues,inputValues)

        const searchAddonRender = {
            searchAddon1:`
            {
                type: 'tagSearch',
                tagSearchKey: 'common',
                attributes: searchTagAttr,
              },
              {
                type: 'button',
                icon: 'refresh',
                func: () => {
                  refresh();
                },
              },
              {
                type: 'customNode',
                content: (
                  <CustomExportNew
                    columns={exportTableColumn}
                    queryParams={query}
                    disableConditionalExp={IsListEmpty}
                    action={async (exportAll, fields, queryParams, FileId) =>
                      ${dynamicInputValues.downloadListApi}({
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
            `,
            searchAddon2:' const exportList = getExportColumns(columns); const [exportTableColumn, setExportTableColumn] = React.useState(exportList);',
            searchAddon3:`import { getExportColumns } from '@src/common/utils';`,
            searchAddon4:`async function ${dynamicInputValues.downloadListApi}(data) {
                return cloudApiRequest('${dynamicInputValues.downloadListApi}', data);
              }`,
            searchAddon5:`
            const searchTagAttr: any[]  = [
                ${TagSearchAttributes.join(',')}
            ]
            `
        }
        return searchAddonRender
    }
}