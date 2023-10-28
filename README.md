# my-bookings

## Overview

This project contains rest APIs, written using nodejs and express, on AWS architecture for online booking.
Have a look at the architecture at docs/architecture.drawio

- the aws resource are created using serverless framework (check serverless.yml under resources.Resources)
- api gateway integration is made using this cool pluging https://www.serverless.com/plugins/serverless-openapi-integration-helper#overview
Basically with 'npm run api:dev' command, serveless merges the swagger.yml with files found under openapi-integration/dev folder.
See also 'openApiIntegration' in serverless.yml.
- body request validation are made with yup library

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

# General improvements

- CI/CD to automate the build, test and deploy (cloudformation stack update, apigateway routes update)
- create two lambdas: roomsApi and bookingsApi each with specific permissions to write to the its tables
- logging (access logs and application)
- add typescript
- automatic swagger generation (currently it has been created manually)
- add tags to cf resources (for better aws billing understanding)
- add code analysis (such as sonarqube)
- add test in postman collection
- add delete protection on test and prod resources
- add a module bundler (such as webpack)
- during deploy add deploy api command to update api gateway stage (to refresh the routes)