import { Tab, TabSwitchProps } from './types';
const down = require('../../assets/icons/caret_down.png');
const trash = require('../../assets/icons/fi_trash-2.png');
const edit = require('../../assets/icons/fi_edit1.png');

const TabSwitch = ({ tabs, activeTab, onTabChange, onSaveClick, isSubmitting }: TabSwitchProps) => {
  const ActiveComponent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 w-fit">
            {tabs
              .filter((tab) => tab.label)
              .map((tab: Tab) => (
                <button
                  key={tab.value}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    activeTab === tab.value ? 'bg-black text-white shadow-md' : 'text-gray-500'
                  }`}
                  onClick={() => onTabChange?.(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <select className="appearance-none border p-2 rounded pr-8">
                <option>2020-2021</option>
                <option>2021-2022</option>
              </select>
              <img src={down} alt="dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            {activeTab === 'work' && (
              <div className="relative">
                <select className="appearance-none border p-2 rounded pr-8">
                  <option>6A</option>
                  <option>6B</option>
                  <option>6C</option>
                </select>
                <img src={down} alt="dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center pr-20 gap-4">
          <button className="p-1 flex items-center">
            <img src={trash} alt="delete" className="w-6 h-6" />
          </button>
          {activeTab === 'general' && (
            <button type="button" onClick={() => onTabChange?.('edit')} className="p-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
              <img src={edit} alt="edit" className="w-6 h-6" />
              <span className="text-white font-medium">Chỉnh sửa</span>
            </button>
          )}

          {activeTab === 'edit' && (
            <button
              type="submit"
              form="myForm"
              onClick={() => onSaveClick?.()}
              disabled={isSubmitting}
              className="p-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <img src={edit} alt="edit" className="w-6 h-6" />
              <span className="text-white font-medium">Lưu</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">{ActiveComponent}</div>
    </div>
  );
};

export default TabSwitch;
