module "key_pair" {
  source     = "terraform-aws-modules/key-pair/aws"
  key_name   = var.instance_key_name
  public_key = tls_private_key.testing.public_key_openssh
}

resource "tls_private_key" "testing" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
