output "private_key_pem" {
  sensitive = true
  value     = tls_private_key.testing.private_key_pem
}

output "public_key_pem" {
  sensitive = true
  value     = tls_private_key.testing.public_key_openssh
}

output "ec2_instance" {
  value = aws_instance.testing
}
