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
	- curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose--$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
	- docker run --rm hello-world

## 其他安装

- curl -sSL https://get.docker.com | sh

## 中国安装

- curl -sSL https://get.daocloud.io/docker | sh


## 设置时区和host相同 https://serverfault.com/a/683651

### docker-compose.yml方式

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





