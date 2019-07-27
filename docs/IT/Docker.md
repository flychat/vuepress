# Docker 拾遗


## 安装

## redhat安装

- https://linuxconfig.org/how-to-install-docker-in-rhel-8
	- yum install yum-utils
	- yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
	- yum list docker-ce --showduplicates | sort -r
	- yum install docker-ce
	- systemctl enable --now docker
	- systemctl is-active docker && systemctl is-enabled docker
	- sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	- sudo chmod +x /usr/local/bin/docker-compose
	- docker run --rm hello-world

## 其他安装

- curl -sSL https://get.docker.com | sh

## 中国安装

- curl -sSL https://get.daocloud.io/docker | sh

## 构建镜像从Dockerfile

```
docker build . -f Dockerfile
docker-composer build .
```

### build with arg

```
# https://stackoverflow.com/questions/43654656/dockerfile-if-else-condition-with-external-arguments/43656644
# docker build -t my_docker .  --build-arg action=deploy
# docker-compose build --build-arg action=deploy
```


## 删除镜像
> docker image rm -f vuepress
> docker rmi $(docker images -q -f dangling=true)  #虚悬镜像(dangling image) 

## 导出镜像
>docker image save vuepress:latest -o /tmp/vuepress.docker.image

## 导入镜像
> docker load < /tmp/vuepress.docker.image

```
docker import /tmp/vuepress.docker.image vuepress
docker import http://example.com/exampleimage.tgz example/imagerepo
```

## pull/push镜像

```
docker login
...
docker push vuepress-image
```









## 设置时区和host相同 https://serverfault.com/a/683651

### docker-compose.yml方式
> ubuntu 为host
```
volumes:
  - "/etc/timezone:/etc/timezone:ro"
  - "/etc/localtime:/etc/localtime:ro"
 ```

 ### Dockerfile方式

 ```
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
 ```
 或 (适用于alpine)
```
RUN apk add --no-cache tzdata
ENV TZ America/Los_Angeles
```





