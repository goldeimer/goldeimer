# output "map_fqdn" {
#   value = aws_route53_record.map.fqdn
# }

# output "map_name" {
#   value = aws_route53_record.map.name
# }

output "name_servers" {
  value = aws_route53_zone.root.name_servers
}

output "zone_id" {
  value = aws_route53_zone.root.zone_id
}
