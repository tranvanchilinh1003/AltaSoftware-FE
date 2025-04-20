interface AddressType {
  addressList: Address[]; // ds địa chỉ
  type?: boolean; //phân loại kiểu đại chỉ
}
interface Address {
  linkName: string; // hieent thị tên liên kết
  link: string; // url của liên kết
}

export default AddressType;
