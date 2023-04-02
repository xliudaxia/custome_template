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
            type:'text',
            name:'listFilterOptionsApi',
            message:"请求列表筛选项的接口名称，例：DescribeAvailabilityListFilterOptions："
        },
        {
            type:'number',
            name:"columns",
            message:"列表有多少列，例：5:"
        },
        {
            type:'list',
            name:"filterKeys",
            message:"哪些Key有过滤，逗号分隔,例：OrgName,State:"
        },
        {
            type:'list',
            name:"filterKeysName",
            message:"filterKeys对应的过滤名称,例：机构名称,可用状态:"
        }
    ],
    getDynamicInput(inputValues){
        const DynamicInput = []
        const columns = inputValues.columns
        if(columns){
            for(let i=0;i<columns;i++){
                DynamicInput.push({name:`columnsKey${i}`,message:`第${i+1}列的key:`,type:'text'})
                DynamicInput.push({name:`columnsHeader${i}`,message:`第${i+1}列的header:`,type:'text'})
                DynamicInput.push({name:`columnsRender${i}`,message:`第${i+1}列的render类型:普通文字text、跳转链接link、`,type:'text'})
            }
        }
        return DynamicInput
    },
    handleDynamicValue(dynamicInputValues,inputValues){
        const dynamicReplaceValues = {}
        const columns = inputValues.columns
        if(columns){
            const columnsAry = this.getColumnsAry(dynamicInputValues,inputValues,columns)
            dynamicReplaceValues.columnArray = columnsAry.join(',')
            const exportTableColumnInitData = this.getExportTableColumnInitData(dynamicInputValues,inputValues,columns)
            dynamicReplaceValues.exportTableColumnInitData = exportTableColumnInitData.join(',')
        }
        const tagSearchAttributes = this.getTagSearchAttributes(dynamicInputValues,inputValues,columns)
        dynamicReplaceValues.tagSearchAttributes = tagSearchAttributes.join(',')

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
                        columnEmptyValue: '--',
                        width: 160,
                        render(row) {
                            return (
                            <Text tooltip={row.${columnsKey}} overflow>
                                {row.${columnsKey}}
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
                        columnEmptyValue: '--',
                        render(row) {
                        return (
                            <Text
                            className="cursor-pointer"
                            theme="primary"
                            overflow
                            tooltip={row.${columnsKey}}
                            align="left"
                            onClick={() => {
                                history.push("\\");
                            }}
                            >
                            {row.${columnsKey}}
                            </Text>
                        );
                        },
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
        const filterKeys = inputValues.filterKeys
        if(filterKeys){
            filterKeys.forEach((item,index)=>{
                TagSearchAttributes.push(`
                {
                    type: ['multiple', { searchable: true }],
                    key: '${item}',
                    name: '${inputValues.filterKeysName[index]}',
                    values: filterOptionsRes.State?.map((item) => ({ key: item, name: item })) || [],
                  }
                `)
            })
        }
        return TagSearchAttributes
    }
}