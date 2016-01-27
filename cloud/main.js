var AWS = require('aws-sdk');

var Parse = require('parse-cloud-express').Parse;


Parse.Cloud.define("hello", function(request, response) {
  //console.log('Ran cloud function.');
  // As with Parse-hosted Cloud Code, the user is available at: request.user
  // You can get the users session token with: request.user.getSessionToken()
  // Use the session token to run other Parse Query methods as that user, because
  //   the concept of a 'current' user does not fit in a Node environment.
  //   i.e.  query.find({ sessionToken: request.user.getSessionToken() })...
  response.success("Hello world! " + (request.params.a + request.params.b)+ "byeeeeeee");
});

Parse.Cloud.define("cognito", function(req, res){
    var params = {
        IdentityPoolId: 'us-east-1:948bc458-fb52-4b87-97eb-2d9d066d77ae', /* required */
        Logins: { /* required */
            'co.seedoc.seedocapp': 'SEEDOCMOH',
            /* anotherKey: ... */
        },
        TokenDuration: 300
    };
    console.log('hiiii mohit');
    var cognitoidentity = new AWS.CognitoIdentity();
    cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, function(err, data) {
        if (err) res.success(err); // an error occurred
        else     res.success(data);           // successful response
    });
    


Parse.Cloud.beforeSave('TestObject', function(request, response) {
  console.log('Ran beforeSave on objectId: ' + request.object.id);
  response.success();
});

Parse.Cloud.afterSave('TestObject', function(request, response) {
  console.log('Ran afterSave on objectId: ' + request.object.id);
});

Parse.Cloud.beforeDelete('TestObject', function(request, response) {
  console.log('Ran beforeDelete on objectId: ' + request.object.id);
  response.success();
});

Parse.Cloud.afterDelete('TestObject', function(request, response) {
  console.log('Ran afterDelete on objectId: ' + request.object.id);
});

