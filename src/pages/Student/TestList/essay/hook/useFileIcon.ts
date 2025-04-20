import { useMemo } from "react";
import IconImages from '../../../../../components/IconImages';
const { iconImageDoc, iconImageJPEG, iconImagePNG, iconImageJPG, iconDefault } = IconImages;

const useFileIcon = (fileName: string) => {
  const fileExtension = useMemo(() => {
    return fileName.split(".").pop()?.toLowerCase() || "";
  }, [fileName]);

  const icon = useMemo(() => {
    switch (fileExtension) {
      case "doc":
      case "docx":
        return iconImageDoc;
      case "jpeg":
        return iconImageJPEG;
      case "png":
        return iconImagePNG;
      case "jpg":
        return iconImageJPG;
      default:
        return iconDefault;
    }
  }, [fileExtension]);

  return icon;
};

export default useFileIcon;
