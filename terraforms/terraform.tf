provider "aws" {
  region = var.region
}

# ~~~ Load Workspace ~~~
terraform {
  required_version = ">= 0.12"
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Teknikio "

    workspaces {
      prefix = "pxt-teknikio"
    }
  }
}

locals {
  # The name of the CloudFormation stack to be created for the VPC and related resources
  aws_vpc_stack_name = "${var.resource_name}-vpc-stack"
  # The name of the CloudFormation stack to be created for the ECS service and related resources
  aws_ecs_service_stack_name = "${var.resource_name}-stack"
  # The name of the ECS cluster to be created
  aws_ecs_cluster_name = "${var.resource_name}-cluster"
  # The name of the ECS service to be created
  aws_ecs_service_name = "${var.resource_name}-service"
  # The name of the execution role to be created
  aws_ecs_execution_role_name = "${var.resource_name}-ecs-execution-role"

  # The name of the ECR repository to be created
  aws_ecr_repository_name = "${var.resource_name}"
}

resource "aws_ecr_repository" "service-repository" {
  name = "${local.aws_ecr_repository_name}-${var.env}"
}


resource "aws_cloudformation_stack" "vpc" {
  name          = "${local.aws_vpc_stack_name}-${var.env}"
  template_body = "${file("cloudformations/public-vpc.yml")}"
  capabilities  = ["CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]

  parameters = {
    ClusterName                = "${local.aws_ecs_cluster_name}-${var.env}"
    ExecutionRoleName          = "${local.aws_ecs_execution_role_name}-${var.env}"
    LoadBalancerCertificateArn = "arn:aws:acm:us-east-1:487619204073:certificate/52b0dcae-a232-40a1-87ba-780d62243087"
  }
}

# Note: creates task definition and task definition family with the same name as the ServiceName parameter value
resource "aws_cloudformation_stack" "ecs_service" {
  name          = "${local.aws_ecs_service_stack_name}-${var.env}"
  template_body = "${file("cloudformations/public-service.yml")}"
  depends_on    = ["aws_cloudformation_stack.vpc"]

  parameters = {
    ContainerMemory = 1024
    ContainerPort   = 3232
    ImageUrl        = var.image_url
    StackName       = "${local.aws_vpc_stack_name}-${var.env}"
    ServiceName     = "${local.aws_ecs_service_name}-${var.env}"
    UseSSL          = "true"
    # Note: Since ImageUrl parameter is not specified, the Service
    # will be deployed with the nginx image when created
  }
}
