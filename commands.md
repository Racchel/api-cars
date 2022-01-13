// com Dockerfile

// cria imagem
sudo docker build -t rentx ./

// rodar container
sudo docker run -p 3333:3333 rentx

// executar cdm do container
sudo docker exec -t rentx /bin/bash

// com docker-compose
sudo docker-compose up -d -> -d serve para não travar o terminal

// comandos
docker ps -> lista containers de pé
docker ps -a -> mais detalhado

# Remove container

docker rm idContainer

#

docker-compose up
docker-compose up --force-recreate

# Stop services only

docker-compose stop

# Stop and remove containers, networks..

docker-compose down

# Down and remove volumes

docker-compose down --volumes

# Down and remove images

docker-compose down --rmi <all|local>

# Run container console

docker exec -t nomeDoContainer /bin/bash

# Show latest logs

docker log idContainer

# Watch logs

docker log idContainer -f

# Ver IP

sudo docker exec nomeContainer cat /etc/hosts

# Criar migrations

yarn typeorm migration:create -n CreateCategories

# Rodar migrations

yarn typeorm migration:run

# Down migrations

yarn typeorm migration:reverte
