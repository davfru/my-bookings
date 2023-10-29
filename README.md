# my-bookings

## Overview

<img src="/docs/architecture.png" >

With this project you can create the above architecture using AWS Cloudformation.
Rest APIs are written using nodejs and express, with serverless framework.

### Features

- aws resources created using serverless framework (cloudformation)
- api gateway integration with swagger.yml
- api gateway protected via cognito authentication
- body request validation using with yup library and express framework
- sh scripts to deploy/undeploy the service (starting point for CI/CD)

### Nice to have

- implement sign up/login API to interact with cognito (see /script/signup.sh, /script/login.sh)
- CI/CD to 
    - automate the build, test and deploy (cloudformation stack update, apigateway routes update) starting from sh script
- logging (cloudwatch access logs and application)
- add typescript
- automatic swagger generation from express (currently it has been created manually)
- add tags to cf resources (for better aws billing understanding)
- add code analysis (such as sonarqube) in pipeline
- add tests in postman collection
- add delete protection on test and prod resources (using serverless if else plugin). Resources such as: dynamo db table, cognito pool
- add a module bundler (such as webpack)

# Prerequisites

- You must have aws cli correctly configured on your machine

# How to

### setup the project

```bash
npm i
```

### run tests

```bash
npm run test
```
### run lambda locally

```bash
npm run invoke-post-booking
```

### invoke API from Postman

As improvment, the following scripts can be replaced by POST /account and POST /login API

first create a .cognito file in the root of the project and add the following:

```bash
CLIENT_ID=cognito client id here
USER_POOL_ID=user pool id here
```

the run

```bash
npm run cognito-signup # register user on cognito
npm run cognito-login # authenticate user. This script print an IdToken that must be passed as Authorization header in the APIs which require it
```

then

- import postman_collenction.json in Postman
- set x-api-key (you can get it from apigateway usage plan once stack is deployed) and Authorization header (from login.sh script) in postman env variables
- invoke the API!

### deploy

```bash
npm run deploy:dev # to deploy in dev env and eu-central-1 region
```

### undeploy

First empty deployment bucket manually (in this case is my-bookings-deployment-bucket).
This is because Cloudformation is not able to delete not-empty bucket

then choose the stage and the region and run:

```bash
npm run undeploy:dev # to undeploy in dev env and eu-central-1 region-1
```

### add new enviroment to deploy

Supponing you want to deploy in a new environment such as test in eu-central-1, then you must:

- add new scripts in the package.json: "api-integration:test", "api-integration-merge:test", "api:test", "undeploy:test", "deploy:test"
- create openapi-integration/test and its content