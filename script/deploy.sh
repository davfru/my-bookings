stage=$1
region=$2
api_name='my-bookings-api'

# This script can be used as a starting point for CI/CD

# create or update cloudformation stack
echo "deploying on $stage stage and $region region"

# install deps
npm i 

# run tests
if ! npm run test; then
  echo "Tests failed. Exiting with code 1"
  exit 1
fi

# update apigateway swagger file
npm run api:$stage 

# update cloudformation and deploy
serverless deploy --stage $stage --region $region 

# update apigateway stage

# get existing api id
api_id=$(aws apigateway get-rest-apis --region $region | jq -r -e ".items | map(select(.name ==\"$api_name\"))[0]?.id")

# update stage
aws apigateway create-deployment --region $region --rest-api-id $api_id --stage-name $stage


