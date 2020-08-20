import { CustomUtils } from '@tqp/utils/custom-utils';

export class ExpenseCategory {
    categoryGuid?: string;
    categoryName?: string;

    constructor(category) {
        {
            this.categoryGuid = category.categoryGuid || CustomUtils.generateGUID();
            this.categoryName = category.categoryName || '';
        }
    }

}
