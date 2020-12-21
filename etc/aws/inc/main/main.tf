module "dns" {
  source = "../../module/dns"

  environment = var.environment
}

module "vpc" {
  source = "../../module/vpc"

  environment         = var.environment
  ip_leading_3_octets = var.vpc_ip_leading_3_octets
}

module "map" {
  source = "../map"
}
