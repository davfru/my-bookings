# my-bookings

## Overview

This project contains rest APIs, written using nodejs and express, on AWS architecture for online booking.
Have a look at the architecture at docs/architecture.drawio

### Features

- aws resources created using serverless framework
- api gateway integration with swagger.yml
- body request validation using with yup library and express framework
- sh script to deploy the service

### Nice to have

- CI/CD to 
    - automate the build, test and deploy (cloudformation stack update, apigateway routes update) starting from sh script
    - update api gateway stage from swagger (to refresh the routes)
- logging (cloudwatch access logs and application)
- add typescript
- automatic swagger generation (currently it has been created manually)
- add tags to cf resources (for better aws billing understanding)
- add code analysis (such as sonarqube) in pipeline
- add tests in postman collection
- add delete protection on test and prod resources (using serverless if else plugin)
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
npm run ...
```

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