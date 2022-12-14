# fb_messenger app clone

## architecture

use rabbitmq as message broker

use nestjs as service framework

1 api service as api-gateway

2 auth service for authentication/authorization

## initial step

```shell
nest new api
cd api
nest g app auth
nest g lib shared
```

## pre-request install dependency

```shell
yarn add @nestjs/config @nestjs/microservices amqplib amqp-connection-manager 
```

## rabbitmq-setup

```yaml
version: '3'
services:
  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    hostname: rabbitmq
    volumes:
      - /var/lib/rabbitmq
    ports:
      - '5672:5672'
      - '15672:15672'
    env_file:
      - .env
```

## add other service config on docker-compose