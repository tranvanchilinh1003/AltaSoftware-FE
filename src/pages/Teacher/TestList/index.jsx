import React, { useState } from 'react';
import ListTableTest from './List';
import AddressList from '../../../components/AddressUrlStack/Index';

const TestList = () => {
    const [urls, setUrls] = useState([
      { link: "/teacher/test-list", linkName: "Bài Kiểm tra" },
      { link: "/teacher/test-list", linkName: "Danh sách bài kiểm tra" }
    ]);
  return <>
  <AddressList addressList={urls} />
    <ListTableTest />
  </>;
};

export default TestList;
