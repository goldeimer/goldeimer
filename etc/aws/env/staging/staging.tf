provider "aws" {
  profile = "goldeimer"
  region  = "eu-central-1"
  version = "~> 3.0"
}

terraform {
  required_providers {
    # provider must be manually built from source, for now
    # @see install-provider.sh for details
    # aws = {
    #   source  = "hashicorp/aws"
    #   version = "~> 3.0"
    # }

    local = {
        source = "hashicorp/local"
        version = "~> 2.0.0"
    }
  }

  backend "s3" {
    bucket         = "goldeimer-terraform-state-staging"
    # dynamodb_table = "TerraformLocks"
    encrypt        = true
    key            = "main/terraform.tfstate"
    profile        = "goldeimer"
    region         = "eu-central-1"
  }
}

module "main" {
  source = "../../inc/main"

  environment             = "staging"
  vpc_ip_leading_3_octets = "10.1.0"
}
