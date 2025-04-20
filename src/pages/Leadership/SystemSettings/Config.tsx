import React, { useEffect, useRef, useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import ConfigScreen from '../../../assets/images/people/leadership/config-screen.png';
import CheckboxComponent from '../../../components/CheckBox';
import Dropdown from '../../../components/Dropdown';
import Button from '../../../components/Button';
function Config() {
  const addressList = [
    { linkName: 'Cài đặt hệ thống', link: '/leadership/system-settings' },
    { linkName: 'Cấu hình', link: '/leadership/system-settings/config' },
  ];

  const [data, setData] = useState({ captcha: false, language: { label: '', value: '' }, theme: '' });

  const handleSetData = (key: 'captcha' | 'language' | 'theme', value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const theme = [
    { title: 'Default', codeHex: '#ECF7FD' },
    { title: 'Primary', codeHex: '#FF7506'},
    { title: 'Primary subtle', codeHex: '#FFA75E'},
    { title: 'Skyblue', codeHex: '#0B80EC'},
    { title: 'Browne', codeHex: '#823B00'},
    { title: 'Dark', codeHex: '#373839'},
  ];

  const pRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (data.theme && pRef.current && data.theme !== '#ECF7FD') {
      pRef.current.style.color = String(data.theme);
    } else {
      if (pRef.current) {
        pRef.current.style.color = 'black';
      }
    }
  }, [data.theme]);

  return (
    <div className="pr-20 pl-10">
      <AddressList addressList={addressList} />
      <div className="mt-5 w-full mb-2 h-[530px] shadow-2xl rounded-2xl">
        <div className="w-full h-[90%] flex">
          <div className="flex-[4] h-full p-8">
            <p className="font-bold text-2xl">Cấu hình</p>
            <div className="max-w-[350px]">
              <img src={ConfigScreen} alt="config-screen" className="max-w-[350px]" />
              <p ref={pRef} className={`text-center font-bold`}>
                Theme đang sử dụng
              </p>
            </div>
            <div className="flex items-center">
              <p className="font-bold pb-0 w-[100px]">Captcha: </p>
              <CheckboxComponent
                onChange={handleSetData.bind(null, 'captcha', !data?.captcha)}
                customStyles={{ label: { fontSize: 12 } }}
                label="Kích hoạt captcha khi đăng nhập vào hệ thống"
              />
            </div>
            <div className="flex items-center">
              <p className="font-bold pb-0 w-[100px]">Ngôn ngữ: </p>
              <Dropdown
                options={[{ label: 'Tiếng Việt', value: '0' }]}
                selectedOption={data.language}
                handleOptionClick={(e) => handleSetData('language', e)}
                
              />
            </div>
          </div>
          <div className="w-px bg-gray-300 h-full"></div>
          <div className="flex-[5] h-full">
            <div className="w-full flex justify-around flex-wrap gap-y-2 mt-3">
              {theme.map((item, index) => (
                <button key={index} className={`w-[218px] h-[125px] rounded-lg`} onClick={handleSetData.bind(null, 'theme', item?.codeHex)}>
                  <div className={`w-full h-[80%] flex justify-center items-center rounded-lg`} style={{backgroundColor: String(item?.codeHex)}}>
                    <p className={`pb-0 ${item?.title!=='Default'&&'text-white'}`}>AaBbCc</p>
                  </div>
                  <p className="text-center text-xl font-bold">{item?.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="me-2">
            <Button size="mini" children="Hủy" className="secondary" />
          </div>
          <div className="me-2">
            <Button size="mini" children="Lưu" className="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;
