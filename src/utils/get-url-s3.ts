const getS3Url = (img: string) => {
  if (process.env.NODE_ENV === "development") {
    return `${"http://localhost:3000/api/s3"}/${img}`;
  } else {
    return `${process.env.REACT_APP_S3_IMAGE}/${img}`;
  }
};

export default getS3Url;
