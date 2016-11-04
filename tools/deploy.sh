#!/bin/bash

set -e

readonly AWS_PROFILE=ide
readonly AWS_REGION=us-east-1
readonly LAMBDA_ARN=arn:aws:lambda:us-east-1:326646314414:function:alexa-lunch-train
readonly LAMBDA_PACKAGE=lambda.zip

printf "Building JavaScript files...\n"
yarn --pure-lockfile
yarn run clean
yarn run build
printf "\n"

printf "Preparing dependencies...\n"
yarn --production --pure-lockfile
printf "\n"

printf "Creating deployment package...\n"
zip -r $LAMBDA_PACKAGE build node_modules package.json LICENSE
printf "\n"

printf "Uploading deployment package to update Lambda function...\n"
aws --profile $AWS_PROFILE --region $AWS_REGION \
  lambda update-function-code \
  --function-name $LAMBDA_ARN \
  --zip-file fileb://$LAMBDA_PACKAGE
printf "\n"

rm $LAMBDA_PACKAGE
printf "Successfully deployed Lambda function.\n"
