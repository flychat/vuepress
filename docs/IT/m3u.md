# vlc在线播放m3u播放列表

## 需求：

- 手机存储空间不足，但想打造自己的移动随身听
- 私人订制：在线收听自己搜藏的节目/专辑

## 条件：

- 每月数据流量用不完或经常暴露WIFI场合
- 自己拥有收藏的播放文件链接


## 步骤：

1. 下载安装VLC播放器
   - VLC 是一款自由、开源的跨平台多媒体播放器及框架，可播放大多数多媒体文件，以及 DVD、音频 CD、VCD 及各类流媒体协议。
      - [https://www.videolan.org/index.zh.html](https://www.videolan.org/index.zh.html)
      - 支持：android、iphone、ipad
2. 电脑下载安装任意纯文本编辑器
   1. 推荐 https://www.sublimetext.com/
   2. Windows用户可使用记事本，保存文件时，注意选择UTF-8
3. 获取资源链接列表和标题，如
   1. https://huoshui.kugou.com/songs/01_001.mp3
   2. https://huoshui.kugou.com/songs/01_002.mp3
   3. ...以上链接可以通过上传自己的web服务器上获取链接，或者已搜集的资源链接
4. 制作m3u文件格式如下
  ![image.png](https://i.loli.net/2020/01/29/kSTh39uVMeXyBdC.png)
  关键词：
    1. \#EXTM3U   
      2. \#EXTINF:-1,这是标题1
             1. 标题可以随意取
             2. -1代表曲目长度未知
5. 另存为 我的专辑1.m3u
6. 发送播放列表文件到 VLC 播放器中即可。
7. 或者把播放列表文件上传到网上，从链接播放，如：
   https://cdn.simai.ml/other/psalm.m3u

