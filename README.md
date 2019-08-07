# Convert Google Doc Content to HTML File and Upload to s3 bucket

This code works on the AWS Lambda running on Nodejs version 10.x. 

**Requirements**

Google Account

1. Create a google doc
2. Update your content on the doc
3. Publish the content to web (**File -> Publish to the web**)
4. Copy the publish link to use it as the input document url for your lambda function

AWS Account

1. Create a lambda function to execute the code
2. S3 Bucket to save the html file

**Setup**

1. Clone the repo 
2. Run ```npm install```
3. Create a zip file by selecting ```server.js``` and the ```node_modules``` folder
4. Upload the package to your lambda function

**Environment Variables**

- ```docUrl``` The publish url of the google document
- ```S3_BUCKET``` S3 bucket name
- ```KEY_PREFIX``` The folder name of the s3 bucket. If the files need to be placed on the root of the bucket. pass the value as ```''```
- ```holidaysData``` Comma separated string with date in DD-MM-YYYY format. Eg ```15-08-2019,11-09-2019,02-10-2019,25-12-2019```

**Permissions**

- Lambda should have the appropriate permissions to access the document url and to upload the parsed html file to s3. For this you may have to create a role for the lambda
- Configure the handler name as ```server.handler```
- You will have to set up a timeout for lambda according to the content of the document you are accessing
- You can trigger this lambda using any different triggers provided by AWS according to your use cases
