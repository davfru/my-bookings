stage=$1
region=$2

# This script can be used for CI/CD

# create or update cloudformation stack
echo "deploying on $stage stage and $region region"

npm i # install deps

# run tests
if ! npm run test; then
  echo "Tests failed. Exiting with code 1"
  exit 1
fi

# update apigateway swagger file
npm run api:$stage 

# todo
# add deploy api to update Api gateway stage

# update cloudformation (then lambda rest api)
serverless deploy --stage $stage --region $region 

# update apigateway routes


