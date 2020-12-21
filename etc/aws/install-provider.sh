#!/usr/bin/sh

# @see https://github.com/hashicorp/terraform-provider-aws/pull/15966

git clone https://github.com/terraform-providers/terraform-provider-aws.git

cd terraform-provider-aws || exit 1

git remote add amplify https://github.com/ashishmohite/terraform-provider-aws.git
git fetch amplify
git checkout -b amplify
git merge amplify/f-amplify-app -m "Merge remote-tracking branch 'amplify/f-amplify-app' into amplify"

go install
cp ~/go/bin/terraform-provider-aws ~/.terraform.d/plugins/terraform-provider-aws_v3.22.0_x5

cd ..
rm -f terraform-provider-aws
