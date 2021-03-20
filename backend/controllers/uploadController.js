const AWS = require("aws-sdk");
const FileType = require("file-type");
const multiparty = require("multiparty");
const fs = require("fs");

const uploadFileToS3 = (buffer, name, type) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

exports.uploadFile = async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error);
    }
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await FileType.fromBuffer(buffer);
      const fileName = `bucketFolder/${Date.now().toString()}`;
      const data = await uploadFileToS3(buffer, fileName, type);
      console.log(data, "data");
      return res.status(200).json({fileInfo:data});
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};
