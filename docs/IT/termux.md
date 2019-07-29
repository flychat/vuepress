# Android的程序员利器

## 安装：
- apk mirror

## 安装sshd

- apt install openssh
- sshd
- add client  OpenSSH key pair 2 android
	- cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys 
	- 如何生成你的id_rsa.pub（ ）？
		-  ssh-keygen 
	- 权限问题
		- chmod 600 ~/.ssh/authorized_keys
		- chmod 700 ~/.ssh
- ssh localhost -p 8022
- pkg install termux-api
- 

# links

- [termux Reading SMS is no longer permitted by Google](https://github.com/termux/termux-api/issues/257)
- https://glow.li/technology/2015/11/06/run-an-ssh-server-on-your-android-with-termux/