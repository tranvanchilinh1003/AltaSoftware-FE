import React, { RefObject } from 'react';
import Select, { MultiValue, GroupBase, components, DropdownIndicatorProps, MenuListProps } from 'react-select';
import { OptionType } from './type';
import { customSelectStyles } from './reactSelectStyles';
import { SearchIcon } from '../Icons/IconComponents';

interface CustomMultiSelectProps {
  options: OptionType[];
  value: OptionType[];
  onChange: (newValue: MultiValue<OptionType>) => void;
  placeholder?: string;
  isDisabled?: boolean;
  components?: any;
  menuRef?: RefObject<HTMLDivElement>; // ref ngoài
  onMenuScroll?: (e: React.UIEvent<HTMLDivElement>) => void; // scroll ngoài
}

// Custom icon dropdown
const DefaultDropdownIndicator = (props: DropdownIndicatorProps<OptionType, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon className="text-[#FF7506]" />
    </components.DropdownIndicator>
  );
};

// Custom menu list gắn ref và onScroll (không bọc thêm div)
const CustomMenuList = (
  props: MenuListProps<OptionType, true> & {
    menuRef?: RefObject<HTMLDivElement>;
    onMenuScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  },
) => {
  const { children, innerRef, innerProps, menuRef, onMenuScroll } = props;

  return (
    <div
      {...innerProps}
      ref={(node) => {
        if (typeof innerRef === 'function') {
          innerRef(node);
        }

        if (menuRef && 'current' in menuRef) {
          (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      onScroll={onMenuScroll}
      style={{ maxHeight: '150px', overflowY: 'auto' }}
    >
      {children}
    </div>
  );
};

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  isDisabled = false,
  components: userComponents = {},
  menuRef,
  onMenuScroll,
}) => {
  const defaultComponents = {
    DropdownIndicator: DefaultDropdownIndicator,
    MenuList: (props: MenuListProps<OptionType, true>) => <CustomMenuList {...props} menuRef={menuRef} onMenuScroll={onMenuScroll} />,
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <Select<OptionType, true, GroupBase<OptionType>>
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      closeMenuOnSelect={false}
      placeholder={placeholder}
      styles={customSelectStyles}
      isDisabled={isDisabled}
      components={mergedComponents}
    />
  );
};

export default CustomMultiSelect;
