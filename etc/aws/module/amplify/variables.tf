variable "name" {
  type        = string
  description = "Name of the amplify app"
}

variable "repository" {
  type        = string
  default     = "https://github.com/goldeimer/goldeimer"
  description = "Repository URL"
}

variable "repository_access_token" {
  type        = string
  description = "Github personal access token"
}

variable "yarn_workspace" {
  type        = string
  description = "Workspace in the referenced remote (mono)repo"
}
