const getS3Url = (img: string) => {
  return `${process.env.REACT_APP_S3_IMAGE}/${img}`;
};

export default getS3Url;
