#!/usr/bin/env sh

set -e

BUILD=${BUILD:-0}
DEV=${DEV:-0}
PROJECT_NAME='testquizprojectapi'
export TEST=${TEST:-'npm run coverage'}
export TEST_PATH=${TEST_PATH:-'./test/**/*.test.js'}

if [ $DEV = 1 ]
then
    COMPOSE_FILE='docker-compose-dev.yml'
else
    COMPOSE_FILE='docker-compose.yml'
fi

if [ $BUILD = 1 ]
then
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up --build -d
else
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up -d
fi

docker logs -f "${PROJECT_NAME}_test_1"
EXIT_CODE=$(docker wait "${PROJECT_NAME}_test_1")

docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE down

exit $EXIT_CODE
