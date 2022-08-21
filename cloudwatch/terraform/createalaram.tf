resource "aws_sns_topic" "eks_pod_memory_topic" {
  name = "eks_pod_memory_topic"
}

resource "aws_sns_topic_subscription" "eks_pod_memory_subscription" {
  topic_arn = aws_sns_topic.eks_pod_memory_topic.arn
  protocol  = "email"
  endpoint  = "${var.email}"

  depends_on = [
    aws_sns_topic.eks_pod_memory_topic
  ]
}


resource "aws_cloudwatch_metric_alarm" "eks_pod_memory_detection" {
  alarm_name          = "EKS_Pod_Memory_Detection"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "pod_memory_utilization"
  namespace           = "ContainerInsights"
  period              = "60"
  statistic           = "Average"
  threshold           = "10"
  alarm_description   = "This metric monitors EKS cluster pod and triggers alarm above 10 percent usage"
  alarm_actions       = [aws_sns_topic.eks_pod_memory_topic.arn]
  dimensions = {
    ClusterName = "${var.project}-cluster"
    PodName = "${var.pod_name}"
    Namespace = "${var.namespace}"
  }
}
