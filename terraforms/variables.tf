variable "region" {
  description = "AWS region e.g. us-east-1 (Please specify a region supported by the Fargate launch type)"

  type = string
  default = "us-east-1"
}

variable "resource_name" {
  description = " Resource name for AWS resources created e.g. webapp"
  type = string
  default = ""
}

variable "env" {
  description = "Application environment, will be used to suffix resources"
  type = string
  default = "dev"
}

variable "image_url" {
  description = "The service image to run"
  type = string
  default = "nginx"
}