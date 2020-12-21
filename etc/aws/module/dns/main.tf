resource "aws_route53_zone" "root" {
  name = "${var.environment}.goldeimer.de"

  tags = {
    environment = var.environment
  }
}

# resource "aws_route53_record" "map" {
#   name    = "map.${aws_route53_zone.root.name}"
#   records = []
#   ttl     = "300"
#   type    = "A"
#   zone_id = aws_route53_zone.root.zone_id
# }
