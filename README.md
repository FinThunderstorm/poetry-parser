# Poetry Parser

[![Poetry Parser CI](https://github.com/FinThunderstorm/poetry-parser/actions/workflows/poetry-parser.yml/badge.svg)](https://github.com/FinThunderstorm/poetry-parser/actions/workflows/poetry-parser.yml) [![codecov](https://codecov.io/gh/FinThunderstorm/poetry-parser/branch/master/graph/badge.svg?token=AQhbMDs7Kn)](https://codecov.io/gh/FinThunderstorm/poetry-parser)

Reaktor's pre-assignment for Autumn 2022 (https://www.reaktor.com/assignment-fall-2022-developers/)

Application is running on AWS Amplify (https://master.d36lw9fh3f86fh.amplifyapp.com/) and backend is running behind AWS API Gateway and it invokes AWS Lambda.

During the development I tried new techniques such as AWS and serverless, as this looked good task for serverless backend. Also managing cloud stack with AWS CloudFormation was new thing.

## CI/CD

Repository has automated CI/CD with Github Actions. Testing and backend deployment is done with Github Actions. Frontend deployment is handled with AWS Amplify.

## Licensing

Application is released with MIT License (https://opensource.org/licenses/MIT).

Package information (poetry.lock -file) retrieved for testing from Poetry's own lock file (https://github.com/python-poetry/poetry/blob/master/poetry.lock) under MIT License.
