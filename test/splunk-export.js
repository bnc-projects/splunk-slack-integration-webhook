exports.json_event = {
    "resource": "/spunk-slack-integration",
    "path": "/spunk-slack-integration",
    "httpMethod": "POST",
    "headers": {
        "Accept-Encoding": "identity",
        "Content-Type": "application/json",
        "Host": "lambda-host.amazonaws.com",
        "User-Agent": "Splunk/User-Agent",
        "X-Amzn-Trace-Id": "Root=X-TRACE",
        "X-Forwarded-For": "169.0.0.1",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "queryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {
        "resourceId": "resourceId",
        "resourcePath": "/spunk-slack-integration",
        "httpMethod": "POST",
        "extendedRequestId": "extendedRequestId=",
        "requestTime": "11/May/2018:11:56:01 +0000",
        "path": "/prod/spunk-slack-integration",
        "protocol": "HTTP/1.1",
        "stage": "prod",
        "requestTimeEpoch": 1526039761551,
        "requestId": "requestId",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "sourceIp",
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "Splunk/userAgent",
            "user": null
        },
        "apiId": "apiId"
    },
    "body": "{\"search_name\": \"Test message\", \"app\": \"search\", \"owner\": \"owner-id\", \"sid\": \"scheduler__owner__search__refId_at_1526039760_53001\", \"result\": {\"exchangename\": \"exchange\", \"exchangeId\": \"1\", \"errorMessage\": \"Status=503 title=Under Maintenance1\", \"count\": \"60\"}, \"results_link\": \"https://www.cloud.splunk.com/en-US/app/search/search?earliest=-15m&latest=now&q=search%20index%3D%22aws-docker%22%20(loggingLevel%3DERROR%20OR%20loggingLevel%3DWARN)&display.page.search.mode=fast&dispatch.sample_ratio=1\"}",
    "isBase64Encoded": false
};
