interface PanigationType {
  numPage?: number; // cái state số page hiện tại
  indexChoose?: number; // cái srtate trang đang chọn
  setIndex?: (page: number) => void; // cái hàm set cái số page lại
  setNumpage?: (page: number) => void; // cái hàm set index lại
  size?: number; // cái srtate trang đang chọn
  setSize?: (page: number) => void;
}
export default PanigationType;
