provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
  version = "~> 2.7"
}

locals {
  # The name of the CloudFormation stack to be created for the VPC and related resources
  aws_vpc_stack_name = "${var.aws_resource_prefix}-vpc-stack"
  # The name of the CloudFormation stack to be created for the ECS service and related resources
  aws_ecs_service_stack_name = "${var.aws_resource_prefix}-stack"
  # The name of the ECS cluster to be created
  aws_ecs_cluster_name = "${var.aws_resource_prefix}-cluster"
  # The name of the ECS service to be created
  aws_ecs_service_name = "${var.aws_resource_prefix}-service"
  # The name of the execution role to be created
  aws_ecs_execution_role_name = "${var.aws_resource_prefix}-ecs-execution-role"

  # The name of the ECR repository to be created
  aws_ecr_repository_name = "${var.aws_resource_prefix}"
}

resource "aws_ecr_repository" "service-repository-int" {
  name = "${local.aws_ecr_repository_name}-int"
}

resource "aws_ecr_repository" "service-repository-prod" {
  name = "${local.aws_ecr_repository_name}-prod"
}

resource "aws_cloudformation_stack" "vpc_int" {
  name = "${local.aws_vpc_stack_name}-int"
  template_body = "${file("cloudformations/public-vpc.yml")}"
  capabilities = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]

  parameters = {
    ClusterName = "${local.aws_ecs_cluster_name}-int"
    ExecutionRoleName = "${local.aws_ecs_execution_role_name}-int"
    LoadBalancerCertificateArn = "arn:aws:acm:us-east-1:937787653866:certificate/e8a15f53-0056-48e8-b4c1-7c255cd3a862"
  }
}

# Note: creates task definition and task definition family with the same name as the ServiceName parameter value
resource "aws_cloudformation_stack" "ecs_service_int" {
  name = "${local.aws_ecs_service_stack_name}-int"
  template_body = "${file("cloudformations/public-service.yml")}"
  depends_on = ["aws_cloudformation_stack.vpc_int"]

parameters = {
    ContainerMemory = 1024
    ContainerPort = 3232
    ImageUrl = "937787653866.dkr.ecr.us-east-1.amazonaws.com/teknikio-int:latest"
    StackName = "${local.aws_vpc_stack_name}-int"
    ServiceName = "${local.aws_ecs_service_name}-int"
    UseSSL = "true"
    # Note: Since ImageUrl parameter is not specified, the Service
    # will be deployed with the nginx image when created
  }
}

resource "aws_cloudformation_stack" "vpc_prod" {
  name = "${local.aws_vpc_stack_name}-prod"
  template_body = "${file("cloudformations/public-vpc.yml")}"
  capabilities = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]

  parameters = {
    ClusterName = "${local.aws_ecs_cluster_name}-prod"
    ExecutionRoleName = "${local.aws_ecs_execution_role_name}-prod"
    LoadBalancerCertificateArn = "arn:aws:acm:us-east-1:937787653866:certificate/e8a15f53-0056-48e8-b4c1-7c255cd3a862"
  }
}

# Note: creates task definition and task definition family with the same name as the ServiceName parameter value
resource "aws_cloudformation_stack" "ecs_service_prod" {
  name = "${local.aws_ecs_service_stack_name}-prod"
  template_body = "${file("cloudformations/public-service.yml")}"
  depends_on = ["aws_cloudformation_stack.vpc_prod"]

  parameters = {
    ContainerMemory = 1024
    ContainerPort = 3232
    ImageUrl = "937787653866.dkr.ecr.us-east-1.amazonaws.com/teknikio-prod:latest"
    StackName = "${local.aws_vpc_stack_name}-prod"
    ServiceName = "${local.aws_ecs_service_name}-prod"
    UseSSL = true
    DesiredCount = 3
    # Note: Since ImageUrl parameter is not specified, the Service
    # will be deployed with the nginx image when created
  }
}
