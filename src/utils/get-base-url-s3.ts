const getS3Url = (img: string) => {
  const baseUrl = process.env.REACT_APP_S3_IMAGE || "http://localhost:3000";
  return `${baseUrl}/api/s3/${img}`;
};

export default getS3Url;
