export const getSelectedCheckboxIds = (checkedItems: { [key: number]: boolean }, data: any[]) => {
    const selectedIds: number[] = [];

    data.forEach((item, index) => {
        if (checkedItems[index]) {
            selectedIds.push(item.id);
        }
    });

    return selectedIds;
};
