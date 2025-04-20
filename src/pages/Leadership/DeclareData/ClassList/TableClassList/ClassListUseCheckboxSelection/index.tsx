import { useState, useEffect } from "react";

export const useCheckboxSelection = (itemsLength: number) => {
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    new Array(itemsLength).fill(false)
  );

  useEffect(() => {
    const totalSelected = selectedItems.filter((item) => item).length;
    const totalItems = selectedItems.length;

    if (totalSelected === totalItems) {
      setSelectAll(true);
      setIndeterminate(false);
    } else if (totalSelected > 0) {
      setSelectAll(false);
      setIndeterminate(true);
    } else {
      setSelectAll(false);
      setIndeterminate(false);
    }
  }, [selectedItems]);

  const handleSelectAllChange = () => {
    const newCheckedState = indeterminate || !selectAll;
    setSelectAll(newCheckedState);
    setSelectedItems(new Array(itemsLength).fill(newCheckedState));
    setIndeterminate(false);
  };

  const handleItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setSelectedItems((prevState) => {
      const updatedSelectedItems = [...prevState];
      updatedSelectedItems[index] = isChecked;

      const totalSelected = updatedSelectedItems.filter((item) => item).length;
      const totalItems = updatedSelectedItems.length;

      setSelectAll(totalSelected === totalItems);
      setIndeterminate(totalSelected > 0 && totalSelected < totalItems);

      return updatedSelectedItems;
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
