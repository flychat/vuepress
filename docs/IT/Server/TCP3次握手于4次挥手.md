# TCP3次握手于4次挥手(1分钟上手)

## 3次握手🤝
> 为什么要3次？ 第2次确定服务器正常状态，保证服务器是正常的，
> 第3次是确定客户端还在，以免浏览器突然关机，服务器傻傻等待！

- 第一次握手，由浏览器发起，我准备发送了！
- 第二次握手，由服务器发起，我准备接收了，请发送吧！
- 第三次握手， 由客户端发起，我开始发送了，请接收吧！


## 4次挥手👋
> 保证请求报文和响应报文都发完了

- 第一次挥手，由浏览器发起，我（请求报文/request）发送完了，准备关闭
- 第二次挥手，由服务器发起，我（请求报文/request）接收完了，我准备关闭了，你也准备关闭吧
- 第三次挥手，由服务器发起，我（响应报文/response）东西发送完了，你准备关闭吧
- 第三次挥手，由浏览器发起，我（响应报文/response）接收完了，我准备关闭了，你也准备吧

## 关键词
- 序列号（Sequence Number）
- ACK （Acknowledge）
- TCP 传输控制协议（可靠）
- UDP 用户数据

## 更多详解
> ACK  FCK

- 在TCP层，有个FLAGS字段，这个字段有以下几个标识：SYN, FIN, ACK, PSH, RST, URG.
	- SYN表示建立连接，
	- FIN表示关闭连接，
	- ACK表示响应，
	- PSH表示有 DATA数据传输，
	- RST表示连接重置。