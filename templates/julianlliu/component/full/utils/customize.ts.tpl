import { isTCE } from '@src/utils/tool';

/**
 * #TCE 版本差异处理
 */

interface CustomizesProps {
  // 默认类型
  defaultType: string;
}

// eslint-disable-next-line import/no-mutable-exports
let customizes: CustomizesProps;
if (!isTCE) {
  customizes = {
    defaultType: '2',
  };
}
if (isTCE) {
  customizes = {
    // TCE下默认为XX类型
    defaultType: '1',
  };
}

export default customizes;
