provider "kubernetes" {
    load_config_file = "false"
    host = data.aws_eks_cluster.iotmv-cluster.endpoint
    token = data.aws_eks_cluster.iotmv-cluster.token
    cluster_ca_certificates = base64decode(data.aws_eks_cluster.iotmv-cluster.certificate_authority.0.data)
}

data "aws_eks_cluster" "iotmv-cluster" {
    name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "iotmv-cluster" {
    name = module.eks.cluster_id
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.17.1"

  cluster_name = "iotmv-eks-cluster"
  cluster_version = "1.30"

  subnet_ids = module.iotmv-vpc.private_subnets
  vpc_id = module.iotmv-vpc.vpc_id

  tags = {
    environment = "development"
    application = "iot-measurements-visualization"
  }

  eks_managed_node_groups = [
    {
        instance_type = "t3.small"
        name = "worker-group-1"
        asg_desired_capacity = 2
    },
    {
        instance_type = "t3.medium"
        name = "worker-group-2"
        asg_desired_capacity = 1
    }
  ]
}
