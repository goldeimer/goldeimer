resource "aws_amplify_app" "app" {
  name = var.name

  access_token             = var.repository_access_token
  enable_branch_auto_build = true
  repository               = var.repository

  auto_branch_creation_config {
    auto_branch_creation_patterns = [
      "feature/*map*",
      "master",
      "release/*",
    ]
    enable_auto_branch_creation = true
    enable_auto_build = true
    enable_pull_request_preview = true
  }

  custom_rules {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  build_spec = <<-EOT
        version: 1
        frontend:
            phases:
                preBuild:
                    commands:
                        - yarn install --peers
                build:
                    commands:
                        - yarn workspace ${var.yarn_workspace} build:prod
            artifacts:
                baseDirectory: ${var.package_directory}/dist
                files:
                    - '**/*'
            cache:
                paths:
                    - node_modules/**/*
EOT
}

## not yet supported by terraform-aws-provider ...

# resource "aws_amplify_branch" "master" {
#     app_id      = "${aws_amplify_app.app.id}"
#     branch_name = "master"
# }

# resource "aws_amplify_domain_association" "app" {
#   app_id      = "${aws_amplify_app.app.id}"
#   domain_name = "example.com"

#   sub_domain_settings {
#     branch_name = "${aws_amplify_branch.master.branch_name}"
#     prefix      = ""
#   }

#   sub_domain_settings {
#     branch_name = "${aws_amplify_branch.master.branch_name}"
#     prefix      = "www"
#   }
# }
