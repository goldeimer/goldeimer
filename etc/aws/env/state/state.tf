provider "aws" {
  profile = "goldeimer"
  region  = "eu-central-1"
  version = "~> 3.0"
}

module "state" {
  for_each = toset(["development", "staging", "production"])
  source   = "../../module/state"

  environment = each.key
}
