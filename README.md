# Ping Pong Client

## Introduction
This web client introduces how to setup mqtt with angular to initiate a ping pong session with rabbitmq.

Follow the steps below to get the service up and running! :)

## Get Started
1. Install [Docker](https://www.docker.com/)
2. Install [Python](https://www.python.org/) and [pip](https://pypi.org/project/pip/)
    - Windows: https://www.python.org/downloads/windows/
        - Be sure to add python and pip to system environment variables PATH.
    - Ubuntu: Python is installed by default
        - Install pip: sudo apt-get install python-pip
3. Install `DockerBuildManagement` build system tool:
    - pip install --update DockerBuildManagement
4. See available commands with [DockerBuildManagement](https://github.com/DIPSAS/DockerBuildManagement) using the `dbm` cli:
    - `dbm -help`

## Build & Run
1. Start domain development by deploying service dependencies:
    - `dbm -swarm -start`
    - The `-swarm -start` command uses [SwarmManagement](https://github.com/DIPSAS/SwarmManagement) deployment tool to deploy all services as described in [src/ServiceDependencies/swarm-management.yml](src/ServiceDependencies/swarm-management.yml) to your local Docker Swarm.
    - One of the deployed services is [Portainer](https://www.portainer.io/), and you can access it at [http://localhost:9000](http://localhost:9000) to manage all your running services.
2. Test solution in containers:
    - `dbm -test`
3. Build and run development solution as container images:
    - `dbm -build -run`
    - Go and develope!
        - http://localhost:4200/
4. Build and run prod solution as container images:
    - `dbm -f build-management.prod.yml -build -run`
5. Publish new docker image:
    - Bump version in [CHANGELOG.md](CHANGELOG.md)
    - Publish docker image: `dbm -f build-management.prod.yml -publish`
6. Stop all running services:
    - `dbm -swarm -stop`

## Build System
- [DockerBuildSystem](https://github.com/DIPSAS/DockerBuildSystem)
- [SwarmManagement](https://github.com/DIPSAS/SwarmManagement)
- [DockerBuildManagement](https://github.com/DIPSAS/DockerBuildManagement)

## Maintainers:
- Team Frost