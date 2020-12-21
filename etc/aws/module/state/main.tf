resource "aws_s3_bucket" "tfstate" {
    acl    = "private"
    bucket = "goldeimer-terraform-state-${var.environment}"
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls   = true
  restrict_public_buckets   = true
}
