resource "aws_instance" "testing" {
  subnet_id                   = var.subnet_id
  ami                         = var.instance_ami_id
  key_name                    = var.instance_key_name
  instance_type               = var.instance_type
  vpc_security_group_ids      = [aws_security_group.testing.id]
  associate_public_ip_address = true

  tags = {
    Name = "${var.service}"
  }
}

resource "aws_security_group" "testing" {
  vpc_id = var.vpc_id
  name   = "${var.service}-instance-sg"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "ssh" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.testing.id
  depends_on        = [aws_security_group.testing]
}

