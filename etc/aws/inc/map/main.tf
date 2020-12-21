data "local_file" "secrets" {
  filename = "${path.module}/secrets.json"
}

locals {
  secrets = jsondecode(data.local_file.secrets.content)
}

module "amplify" {
  source = "../../module/amplify"

  name                    = "map"
  repository_access_token = local.secrets.repository_access_token
  yarn_workspace          = "@goldeimer/map-core"
}
