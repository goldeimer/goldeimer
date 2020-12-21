resource "aws_vpc" "root" {
  cidr_block = "${var.ip_leading_3_octets}.0/24"

  tags = {
    environment = var.environment
  }
}
