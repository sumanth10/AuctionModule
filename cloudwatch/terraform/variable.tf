variable "aws_access_key" {
  description = "AWS access key"
  type        = string
  default = ""
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
  default = ""
}

variable "region" {
  description = "The aws region. https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html"
  type        = string
  default     = "eu-central-1"
}

variable "pod_name" {
  description = "The pod name to which you want to create alarm"
  type        = string
  default     = "hellowworld"
}

variable "namespace" {
  description = "The namespace in which your pod resides"
  type        = string
  default     = "devops-challenge"
}

variable "project" {
  description = "Name to be used on all the resources as identifier. e.g. Project name, Application name"
  type = string
  default = "devOps"
}

variable "email" {
  description = "Email address to send notifications to"
  type = string
  default = "sumanthkulkarni10@gmail.com"
}

variable "httpendpoint" {
  description = "Http endpoint to send notifications to"
  type = string
  default = "http://example.com"
}


variable "tags" {
  description = "Map of tags"
  type        = map(string)
  default = {
    "Project"     = "DevOpsChallenge"
    "Environment" = "Development"
    "Owner"       = "Sumant Kulkarni"
  }
}
