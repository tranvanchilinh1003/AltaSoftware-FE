import React from 'react';
import AddressType from './type';
import arrow from '../../assets/images/chevron_big_right.png';
import './Style.css';
import { Link } from 'react-router-dom';

const AddressList: React.FC<AddressType> = ({ addressList, type = true }) => {
  let size = addressList.length;
  function processArray() {
    if (type && addressList.length > 5) {
      const firstPart = [addressList[0], { linkName: '...', link: '#' }];
      const lastPart = addressList.slice(-2);
      addressList = [...firstPart, ...lastPart];
      size = addressList.length;
      return addressList;
    }
    return addressList;
  }

  return (
    <div className="container">
      {processArray().map((v, index) => {
        return index < size - 1 ? (
          <>
            <Link to={v.link} className="smalltext">
              {' '}
              {v.linkName}{' '}
            </Link>{' '}
            <img className="image" src={arrow} />
          </>
        ) : (
          <Link to={v.link} className="bigtext">
            {' '}
            {v.linkName}
          </Link>
        );
      })}
    </div>
  );
};
export default AddressList;
