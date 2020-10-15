import { CustomUtils } from '@tqp/utils/custom-utils';

export class ExpenseType {
    expenseTypeGuid?: string;
    expenseTypeName?: string;

    constructor(category) {
        {
            this.expenseTypeGuid = category.categoryGuid || CustomUtils.generateGUID();
            this.expenseTypeName = category.categoryName || '';
        }
    }

}
