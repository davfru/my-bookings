#!/bin/sh
# register a user on cognito pool

REGION="eu-central-1"
PASSWORD="Papap!434"
USERNAME="davide.fruci"

aws cognito-idp admin-create-user \
  --user-pool-id $USER_POOL_ID \
  --region $REGION \
  --username $USERNAME \

aws cognito-idp admin-set-user-password \
    --user-pool-id $USER_POOL_ID \
    --username $USERNAME \
    --password $PASSWORD \
    --permanent