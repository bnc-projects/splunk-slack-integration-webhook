const https = require('https');

const slack_path = process.env.SLACK_PATH;
const slack_channel = process.env.SLACK_CHANNEL;

exports.handler = (event, context, callback) => {
  console.info('Event received [json=\"%s\"]', JSON.stringify(event));

  const jsonBody = JSON.parse(event.body);

  const request = {
    "channel": slack_channel,
    "username": "splunk-slack-webhook",
    "icon_url": "https://www.splunk.com/content/dam/splunk2/images/icons/products-solutions/splunk-icon-01.png",
    "attachments": [
      {
        "title": jsonBody.search_name,
        "title_link": jsonBody.results_link,
        "text": JSON.stringify(jsonBody.result),
        "color": "#b84d0a",
        "ts": new Date().getTime() / 1000
      }
    ]
  };

  // Build the post string from an object
  const post_data = JSON.stringify(request);

  // An object of options to indicate where to post to
  const post_options = {
    host: 'hooks.slack.com',
    port: '443',
    path: slack_path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    }
  };

  const post_request = https.request(post_options, function (res) {
    console.log('Response received [status=%s]', res.statusCode);
    let body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      callback(null, body);
    });
  });

  post_request.on('error', context.fail);
  // Post the data.
  post_request.write(post_data);
  post_request.end();
};
