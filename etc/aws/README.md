# [`terraform`](terraform-docs) infrastructure orchestration recipies

To run these recipies, `terraform`, `terraform-aws-provider`, and `aws-cli` should be installed and an [AWS shared credentials file](aws-credentials) containing a `[goldeimer]` profile should exist in `$HOME/.aws/credentials` (Linux and macOS) or `%USERPROFILE%\.aws\credentials` (Windows)`.

```
# $HOME/.aws/credentials
[goldeimer]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

```hc1
cd staging # or other valid environment
terraform init -backend-config="access_key=AKIAIOSFODNN7EXAMPLE" -backend-config="secret_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
# display current state
terraform show
```

State is kept in an encrypted S3 bucket on the remote.
Run `git secret reveal` to decrypt sensitive input data.
Run `terraform validate` to verify correctness of infrastructure changes, and `terraform apply` to make them happen on the remote.

[aws-credentials]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[terraform-docs]: https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started
