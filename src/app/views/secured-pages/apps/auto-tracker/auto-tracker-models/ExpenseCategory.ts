import {FuseUtils} from '@fuse/utils';

export class ExpenseCategory {
    categoryGuid?: string;
    categoryName?: string;

    constructor(category) {
        {
            this.categoryGuid = category.categoryGuid || FuseUtils.generateGUID();
            this.categoryName = category.categoryName || '';
        }
    }

}
