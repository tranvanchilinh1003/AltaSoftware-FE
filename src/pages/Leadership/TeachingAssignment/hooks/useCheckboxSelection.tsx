
import { useState, useEffect } from "react";

export const useCheckboxSelection = (itemsLength: number, page: number) => {
    const [selectAll, setSelectAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selectedItemsMap, setSelectedItemsMap] = useState<Map<number, boolean[]>>(new Map());

    useEffect(() => {
        if (!selectedItemsMap.has(page)) {
            setSelectedItemsMap((prev) => {
                const newMap = new Map(prev);
                newMap.set(page, new Array(itemsLength).fill(false));
                return newMap;
            });
        }
    }, [itemsLength, page, selectedItemsMap]);

    const selectedItems = selectedItemsMap.get(page) || new Array(itemsLength).fill(false);

    useEffect(() => {
        const totalSelected = selectedItems.filter(Boolean).length;
        setSelectAll(totalSelected === itemsLength);
        setIndeterminate(totalSelected > 0 && totalSelected < itemsLength);
    }, [selectedItems, itemsLength]);

    const handleSelectAllChange = () => {
        setSelectedItemsMap((prev) => {
            const newMap = new Map(prev);
            newMap.set(page, new Array(itemsLength).fill(!selectAll));
            return newMap;
        });
        setSelectAll(!selectAll);
        setIndeterminate(false);
    };

    const handleItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectedItemsMap((prev) => {
            const newMap = new Map(prev);
            const updatedItems = [...(newMap.get(page) || new Array(itemsLength).fill(false))];
            updatedItems[index] = isChecked;
            newMap.set(page, updatedItems);
            return newMap;
        });
    };

    return {
        selectAll,
        indeterminate,
        selectedItems,
        handleSelectAllChange,
        handleItemChange,
    };
};
