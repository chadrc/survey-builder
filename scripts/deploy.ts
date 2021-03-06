(async () => {
  const AWS = require('aws-sdk');
  const fs = require('fs');
  const path = require('path');

  const s3 = new AWS.S3({region: 'us-east-1'});
  const ssm = new AWS.SSM({region: 'us-east-1'});

  // get params from systems manager parameter store
  const prefix = '/survey-builder'; // no trailing slash to match what IAM needs for permissions
  const params = (await ssm.getParametersByPath({
    Path: prefix,
  }).promise()).Parameters.reduce((prev, curr) => {
    const name = curr.Name.replace(`${prefix}/`, '').replace('/', '.');
    prev[name] = curr.Value;
    return prev;
  }, {});

  const siteBucket = params['site-bucket'];

  // clear site bucket
  const listObjectsResponse = await s3.listObjectsV2({
    Bucket: siteBucket
  }).promise();

  if (listObjectsResponse.Contents.length > 0) {
    await s3.deleteObjects({
      Bucket: siteBucket,
      Delete: {
        Objects: listObjectsResponse.Contents
          .map((content) => ({ Key: content.Key }))
      }
    }).promise();
  }

  // upload all files from dist/survey-app to site bucket
  const appDir = path.resolve(__dirname, '../dist/survey-app');
  const fileList = fs.readdirSync(appDir);

  for (const file of fileList) {
    await s3.putObject({
      Bucket: siteBucket,
      Key: file,
      Body: fs.readFileSync(`${appDir}/${file}`),
    }).promise();
  }
})().then(() => console.log('done'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
