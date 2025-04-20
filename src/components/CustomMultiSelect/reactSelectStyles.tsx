import { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig<any, true> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '8px',
    borderColor: state.isFocused ? '#FF7506' : '#ccc',
    boxShadow: state.isFocused ? '0 0 5px rgba(255, 117, 6, 0.5)' : 'none',
    minHeight: '42px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      borderColor: '#FF7506',
      boxShadow: '0 0 5px rgba(255, 117, 6, 0.5)',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    flexWrap: 'wrap',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#999',
    fontStyle: 'italic',
    fontSize: '14px',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#4285F4',
    borderRadius: '20px',
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#2C6BED',
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#fff',
    fontWeight: 600,
    fontSize: '13px',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '50%',
    padding: '2px',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#FF7506',
      color: '#fff',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#FF7506',
    transition: 'transform 0.3s',
    '&:hover': {
      color: '#FF5500',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '150px', // giới hạn chiều cao
    overflowY: 'auto',  // hiển thị thanh cuộn khi cần
  }),
  
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#FF7506'
      : state.isFocused
      ? '#FFE0B2'
      : 'transparent',
    color: state.isSelected ? '#fff' : '#333',
    padding: '10px 15px',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#FFD089',
      color: '#333',
    },
  }),
};
