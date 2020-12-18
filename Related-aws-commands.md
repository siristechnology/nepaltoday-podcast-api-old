### To push docker from local to ECR (Elastic Container Registry)

-   Login to ecr repo: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 148015068777.dkr.ecr.us-east-1.amazonaws.com`
-   Build docker image locally: `docker build -t nt-podcast-image-repo .`
-   Tag docker image: `docker tag nt-podcast-image-repo:latest 148015068777.dkr.ecr.us-east-1.amazonaws.com/nt-podcast-image-repo:latest`
-   Push docker image: `docker push 148015068777.dkr.ecr.us-east-1.amazonaws.com/nt-podcast-image-repo:latest`

### To run task/view logs in ECS

-   Run ecs task from definition: `aws ecs run-task --launch-type FARGATE --task-definition "arn:aws:ecs:us-east-1:148015068777:task-definition/nt-podcast-task:17" --cluster Default --count 1 --network-configuration "awsvpcConfiguration={subnets=[subnet-0d23738d35683b489],securityGroups=[sg-0b77a8558f246f863],assignPublicIp=ENABLED}"`

-   Follow logs from task execution: `ecs-cli logs --task-id baacc4a0710b425fa01393617a74d1d4 --task-def nt-podcast-task --follow`
