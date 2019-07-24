# laravel Nova痛苦的经历
>2019-07-24

> 上线的项目不轻易敢改，除非出问题。

终于，它出问题了， 购买的nova帐户license莫名消失，给官网发了N个邮件，等了2天还未解决，第4天早上才和客服邮件有正常的沟通！幸好之前有朋友借用，下载过离线包（赠人玫瑰）

苦苦等了2天，心想周二，就是人家米国的周一，该有人上班解决吧，结果不然，于是做了一个艰难的决定：用离线的方式来装，遇到一个问题，下载的版本是（2.x），对laravel要求为5.8，结果悲剧了！需要暴力升级！

- 把不兼容的包，先去掉，执行composer udpate升级laravel 5.8号，然后再composer reuqire 回来，著名的package都会支持最新的5.8了
- 把database中 $table->Increments('id'); 改为 $table->bigIncrements('id');
	- 注意其他表对id的索引也需要改 如： unsignedBigInteger("user_id")
- 本来觉得应该可以了，可惜nova2的action_events数据表与1不兼容，导致无法修改item，只能暴力数据库迁移来更新action_events表
- 更多升级注意事项[https://laravel.com/docs/5.8/upgrade](https://laravel.com/docs/5.8/upgrade)

## 暴力数据库迁移

- 导出旧的数据表，不带结构，只有数据，然后重新执行：php artisan migrate:fresh
- php artisan rinvex:publish:subscriptions 
- php artisan rinvex:publish:categories 
	- php artisan rinvex:migrate:subscriptions
	- php artisan rinvex:migrate:categories
- 按顺序导入数据

```
source tags.sql;
source users.sql;
source point_transactions.sql;
source wechat_accounts.sql;
source albums.sql;
source ly_audios.sql;
source ly_metas.sql;
source ly_lts.sql;
source wechat_auto_replies.sql;
source album_subscriptions.sql;
source wechat_user_profiles.sql;
source posts.sql;
source wechat_pay_orders.sql;
source wechat_account_profiles.sql;
source categories.sql;
source wechat_messages.sql;
source gamps.sql;
source plans.sql;

source roles.sql;
source role_user.sql;
source role_permission.sql;
```

## 大bug

- [Class 'Barryvdh\Debugbar\ServiceProvider' not found](https://github.com/barryvdh/laravel-debugbar/issues/480)
