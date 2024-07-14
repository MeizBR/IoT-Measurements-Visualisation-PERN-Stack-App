provider "aws" {
    region = "eu-north-1"
}

variable vpc_cidr_block {}
variable private_subnet_cidr_blocks {}
variable public_subnet_cidr_blocks {}

data "aws_availability_zones" "azs" {}

module "iotmv-vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.9.0"

  name = "iotmv-vpc"
  cidr = var.vpc_cidr_block

  # best practice: 2 subnets (public and private per AZ)
  private_subnets = var.private_subnet_cidr_blocks
  public_subnets = var.public_subnet_cidr_blocks
  azs = data.aws_availability_zones.azs.names

  enable_nat_gateway = true
  single_nat_gateway = true
  enable_dns_hostnames = true

  tags = {
    "kubernetes.io/cluster/iotmv-eks-cluster" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/iotmv-eks-cluster" = "shared"
    "kubernetes.io/role/elb" = 1 # block internet access
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/iotmv-eks-cluster" = "shared"
    "kubernetes.io/role/internal-elb" = 1 # allow internet access
  }
}