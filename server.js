exports.handler = async (event) => {
    const request = require('request');
    const cheerio = require('cheerio');
    const moment = require('moment-timezone');
    const docUrl = process.env.docUrl;
    const S3_BUCKET = process.env.S3_BUCKET;
    const KEY_PREFIX = process.env.KEY_PREFIX;
    const currentDate = moment().tz("Asia/Kolkata").format('DD-MM-YYYY');
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    const promise = new Promise(function(resolve, reject) {
        request(docUrl, function (error, response, body) {
            if(error) {
                console.log(error);
                reject(Error(error));
            } else {
                if(response.statusCode === 200) {
                    const $ = cheerio.load(body);
                    const data = $('#contents').html();
                    const params = {
                        Bucket: S3_BUCKET,
                        Key: KEY_PREFIX+currentDate+".html",
                        Body: data,
                        ContentType: 'text/html',
                        ACL: 'public-read'
                    };
                    s3.upload(params, function(err, data) {
                        if(err) {
                            console.log("s3 file upload failed");
                            reject(Error(err));
                        } else {
                            console.log(data);
                            resolve(JSON.stringify(data));
                        }
                    });
                }
            }
        });
    });
    return promise;
};