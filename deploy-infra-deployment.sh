# source aws_credentials.sh

STACK_NAME=final-pro-stack
REGION=us-east-1
CLI_PROFILE=h10user

EC2_INSTANCE_TYPE=t2.micro 

# Deploy the CloudFormation template
echo -e "\n\n=========== Deploying main.yml ==========="
aws cloudformation deploy \
  --region $REGION \
  --profile $CLI_PROFILE \
  --stack-name $STACK_NAME \
  --template-file main.yml \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EC2InstanceType=$EC2_INSTANCE_TYPE

# If the deploy succeeded, show the DNS name of the created instance
if [ $? -eq 0 ]; then
  BUCKET_NAME=$(aws cloudformation list-exports \
    --profile $CLI_PROFILE \
    --query "Exports[?Name=='S3BucketName'].Value" \
    --output text)

  # Build the React app
  echo -e "\n\n=========== Building React App ==========="
  npm install
  npm run build

  # Deploy the build to S3
  echo -e "\n\n=========== Deploying to S3 ==========="
  aws s3 sync build/ s3://$BUCKET_NAME/

  echo "Successfully deployed the React app to S3 bucket: $BUCKET_NAME"
fi

