# Docker 拾遗

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





