
```
[common]
server_addr = 8.8.4.4
server_port = 7000
user = lede
privilege_token = frp

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 2023

[web]
type = http
local_ip = 127.0.0.1
local_port = 80
use_encryption = false
use_compression = false
subdomain = lede
```