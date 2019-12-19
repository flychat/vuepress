# socks5 集群均衡负载

``` ./haproxy.cfg
=====./haproxy.cfg=====
frontend socks5
    mode tcp
    bind *:8080
    timeout client          1m
    default_backend ssh_cluster

backend ssh_cluster
    mode tcp
    balance roundrobin
    timeout connect         10s
    timeout server          1m
    server vps1 52.xx.xx.xx:2020 weight 1 check inter 30000
    server vps2 34.xx.xx.xx:2020 weight 1 check inter 30000

listen stats 
	bind *:9090
    balance
    mode http
    stats enable
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    stats uri /haproxy?stats


=====docker-compose.yml=====
version: '3'
services:
  app:
    image: haproxy
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "9090:9090"
    volumes:
      - ./haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro
      
      
====start===
docker-compose up -d

====test====
curl -x 192.168.31.45:8080 http://icanhazip.com

```

