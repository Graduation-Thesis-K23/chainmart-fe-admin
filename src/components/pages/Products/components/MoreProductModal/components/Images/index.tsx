import React, { FC, useEffect, useState } from "react";
import { Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile } from "antd/es/upload";

const Images: FC<{
  onChange: (...event: unknown[]) => void;
}> = ({ onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeFile: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    onChange(fileList.map((img) => img.originFileObj));
  }, [fileList]);

  return (
    <div>
      <label htmlFor="s">Image</label>
      <ImgCrop showGrid>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChangeFile}
          onPreview={onPreview}
        >
          + Upload
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default Images;
