#!/bin/bash

stage=$1
region=$2

# first empty and delete serveless deployment bucket (cloudformation cannot delete not-empty bucket)

# delete stack
echo "undeploying on $stage stage and $region region"

serverless remove --stage $stage --region $region