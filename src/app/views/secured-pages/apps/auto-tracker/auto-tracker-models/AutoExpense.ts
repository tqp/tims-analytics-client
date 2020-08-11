import {FuseUtils} from '@fuse/utils';

export class AutoExpense {
    expenseGuid?: string;
    categoryGuid?: string;
    categoryName?: string;
    expenseCost?: number;
    expenseDate?: string;

    constructor(expense) {
        {
            this.expenseGuid = expense.expenseGuid || FuseUtils.generateGUID();
            this.categoryGuid = expense.categoryGuid || '';
            this.categoryName = expense.categoryName || '';
            this.expenseCost = expense.expenseCost || 0;
            this.expenseDate = expense.expenseDate || '';
            this.expenseDate = expense.expenseDate || '';
        }
    }

}
