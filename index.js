const https = require('https');

const slack_path = process.env.SLACK_PATH;
const slack_channel = process.env.SLACK_CHANNEL;

const textFromPayload = function (payload) {
  if (payload._raw) {
    return payload._raw;
  }
  if (payload.errorMessage) {
    return payload.errorMessage;
  }
  return JSON.stringify(payload);
};

const colorFromPayload = function (payload) {
  if ("WARN" === payload.loggingLevel) {
    return "#b8660a";
  }
  if ("ERROR" === payload.loggingLevel) {
    return "#b82004";
  }
  if (payload._raw) {
    return "#3fb836";
  }
  if (payload.errorMessage) {
    return "#b82004";
  }
  return "#b8af05";
};

const fieldsFromPayload = function (payload) {
  const fields = [];
  Object.entries(payload).filter(
      entry => "_raw" !== entry[0] && "errorMessage" !== entry[0]).forEach(
      entry => fields.push({
        "title": entry[0],
        "value": entry[1],
        "short": !entry[1] || !entry[1].length || entry[1].length < 200
      })
  );
  return fields;
};

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
        "text": textFromPayload(jsonBody.result),
        "color": colorFromPayload(jsonBody.result),
        "fields": fieldsFromPayload(jsonBody.result),
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
