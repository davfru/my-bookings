aws cognito-idp initiate-auth \
    --auth-flow USER_PASSWORD_AUTH \
    --auth-parameters USERNAME=davide.fruci,PASSWORD=Papap!434 \
    --client-id $CLIENT_ID
