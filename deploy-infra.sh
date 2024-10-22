#!/bin/bash

# source aws_credentials.sh

STACK_NAME=stack_name
REGION=us-east-1
CLI_PROFILE=default

BUCKET_NAME="bucket_name"
GITHUB_REPO="REPO_LINK"
GITHUB_BRANCH="main"
GITHUB_TOKEN="your_token"
DYANMODB_TABLE_NAME="db_name"
API_GATEWAY_STAGE="dev"

# Deploy the CloudFormation template
echo -e "\n\n=========== Deploying cloud.yml ==========="
aws cloudformation deploy \
  --region $REGION \
  --profile $CLI_PROFILE \
  --stack-name $STACK_NAME \
  --template-file cloud.yml \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    BucketName=$BUCKET_NAME \
    GitHubRepo=$GITHUB_REPO \
    GitHubBranch=$GITHUB_BRANCH \
    GitHubToken=$GITHUB_TOKEN \
    TableName=$DYANMODB_TABLE_NAME \
    StageName=$API_GATEWAY_STAGE \
  --capabilities CAPABILITY_NAMED_IAM

# If the deploy succeeded, show the DNS name of the created instance
if [ $? -eq 0 ]; then
  # Get the CloudFront URL
  aws cloudformation describe-stacks \
    --profile $CLI_PROFILE \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
    --output text

  # Get the Bucket Website URL
  aws cloudformation describe-stacks \
    --profile $CLI_PROFILE \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='BucketWebsiteURL'].OutputValue" \
    --output text

  # Get the API Gateway URL
  aws cloudformation describe-stacks \
    --profile $CLI_PROFILE \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='ApiGatewayURL'].OutputValue" \
    --output text
fi
