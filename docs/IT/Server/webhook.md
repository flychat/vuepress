# 我的第一个webhook
> 2019-07-18 20:30 ~ 20:47 ~ 21:05


## 概述

在一个vuepress的docker中发现了一个[go语言写的webhook的影子](https://github.com/blastehh/vuepress-docker/blob/master/build.sh)，于是找到了这个[https://github.com/adnanh/webhook](https://github.com/adnanh/webhook)。


webhook通常用在什么地方？

> 在服务器上执行一个脚本，但是需要用户（客户端）手动点击一个链接即可出触发。（使用http）
> 更通俗的讲，一些build脚本和deploy脚本工作在服务器中完成，本地只需要提交代码即可，对用户屏蔽部署细节。

如下所述：

>webhook is a lightweight configurable tool written in Go, that allows you to easily create HTTP endpoints (hooks) on your server, which you can use to execute configured commands. You can also pass data from the HTTP request (such as headers, payload or query variables) to your commands. webhook also allows you to specify rules which have to be satisfied in order for the hook to be triggered.

我的目标:

- 用户提交了代码之后，在服务器上而不是在本地build并更新vuepress到github.io，因为服务器上更快，对于使用vuepress的普通用户来说，屏蔽了一些技术细节，用户只需要专心写作，提交代码到github，然后访问一个webhook地址，稍等片刻，即可自动部署到github.io。
- 一个同步脚本，两个区域的服务器数据库直接的同步，之前一直在我电脑里运行，因为我可以免密登陆这两台服务器，客户请求同步后我手动执行脚本，现在要换成使用第三台小服务器来执行，只需要用户点击链接，稍等片刻即可同步成功 


## 安装 

参考[https://github.com/adnanh/webhook](https://github.com/adnanh/webhook)，最后我使用的是下载编译好的webhook-linux-amd64.tar.gz。解压后放到/usr/local/bin/webhook

## 配置

### 创建目录
```
mkdir -p /var/scripts/
mkdir -p /var/webhook/
touch /var/scripts/demo.sh
tocuh /var/webhook/hooks.json
```
### 创建一个Demo脚本

>vi /var/scripts/demo.sh
```
#! /bin/bash
echo "demo webhook runing" >> /tmp/webhook.log
date >> /tmp/webhook.log
echo "demo webhook done" >> /tmp/webhook.log
```

### 创建webhook配置文件
>vi /var/webhook/hooks.json
```
[
  {
    "id": "demo",
    "execute-command": "/var/scripts/demo.sh",
    "command-working-directory": "/var/webhook"
  },
  {
    "id": "lms",
    "execute-command": "/var/scripts/lms-sync.sh",
    "command-working-directory": "/var/webhook"
  },
  {
    "id": "vuepress",
    "execute-command": "/var/scripts/vuepress-build.sh",
    "command-working-directory": "/var/webhook"
  }
]
```

### 开启webhook服务

```nohup webhook -hooks ./hooks.json -verbose -port 9002 &```
>nohup ... & 表示后台运行的方式 //todo 守护进程与监控 supervisor
>因为这个进程可能宕掉，服务器重启后也不会自动启动的。

### 开启webhook服务 方式2

参考 [https://davidauthier.com/blog/deploy-using-github-webhooks.html](https://davidauthier.com/blog/deploy-using-github-webhooks.html)

vi /etc/systemd/system/webhook.service
```
[Unit]
Description=Webhooks

[Service]
ExecStart=/usr/local/bin/webhook -hooks /var/webhook/hooks.json -hotreload -verbose -port 9002

[Install]
WantedBy=multi-user.target
Alias=webhook.service
```
systemctl enable webhook.service

systemctl restart webhook.service

service webhook status

 
### 执行
当前服务器执行：  curl -s http://localhost:9002/hooks/demo
其他执行，把localhost换成服务器ip或域名


## 我的目标代码

内含业务逻辑，不作说明，作为记录只用，请略过。
> touch /var/scripts/lms-sync.sh
> touch /var/scripts/vuepress-build.sh

### 实现我的第1个目标
>vi /var/scripts/vuepress-build.sh

date >> /tmp/$1.$2.$3.log => /tmp/vuepress.28c4801b9685ab281a472e75b0951b440e84f218.flychat.log


```
#! /bin/bash
date >> /tmp/$3.log
cd /var/www/vuepress/$3/ && git pull origin master && docker-compose up --build >> /tmp/$3.log
date >> /tmp/$3.log
```
### 实现我的第2个目标
>vi /var/scripts/lms-sync.sh
```
#! /bin/bash
date >> /tmp/sync-lms-abc.log
cd /var/www/laravel-abc-lms &&  php ~/.config/composer/vendor/bin/envoy run sync >> /tmp/sync-lms-abc.log
date >> /tmp/sync-lms-abc.log
```

### 设定cron执行
```
0 10,18 * * * curl -s http://localhost:9002/hooks/simai
0 5,16-18 * * * curl -s http://localhost:9002/hooks/lms
```

## 总结

不需要go语言基础，直接安装按照配置使用接口，该webhook默认使用的是9000端口，可以使用-port 9002来指定端口。


## 进阶 post方式

上面的方式存在问题： 没有权限验证，任何知道/获得该地址的用户可以随意点击，导致服务器繁忙！

提交到master分支，注意：
- YOU-SECRET
- github的repository的webhook中Content type选择 application/json
  - https://github.com/YOURNAME/YOUR-REPO/settings/hooks/new

post json配置：
```
[
  {
    "id": "vuepress",
    "execute-command": "/var/scripts/vuepress-build.sh",
    "response-message": "I got the payload!",
    "command-working-directory": "/var/webhook",
    "pass-arguments-to-command":
    [
      {
        "source": "payload",
        "name": "repository.name"
      },
      {
        "source": "payload",
        "name": "head_commit.id"
      },
      {
        "source": "payload",
        "name": "pusher.name"
      },
      {
        "source": "payload",
        "name": "pusher.email"
      }
    ],
    "trigger-rule":
    {
      "and":
      [
        {
          "match":
          {
            "type": "payload-hash-sha1",
            "secret": "YOU-SECRET",
            "parameter":
            {
              "source": "header",
              "name": "X-Hub-Signature"
            }
          }
        },
        {
          "match":
          {
            "type": "value",
            "value": "refs/heads/master",
            "parameter":
            {
              "source": "payload",
              "name": "ref"
            }
          }
        }
      ]
    }
  }
]
```
