已收集的 常用bilibili api 集合

## 获取视频信息

###### https://api.bilibili.com/x/web-interface/view

| 字段 | 描述 |
| ---- | ---- |
| aid  | AV号 |
| bvid | BV号 |



## 获取稿件tag

###### https://api.bilibili.com/x/web-interface/view/detail/tag

| 字段       | 必需 | 描述 |
| ---------- | ---- | ---- |
| aid / bvid | 是   |      |
| cid        | 否   |      |



## 获取专栏信息

###### https://api.bilibili.com/x/article/viewinfo

| 字段 | 描述 |
| ---- | ---- |
| id   | CV号 |





## 获取番剧信息

##### https://api.bilibili.com/pgc/web/season/stat

| 字段      | 描述 |
| --------- | ---- |
| season_id | SS号 |



###### https://api.bilibili.com/pgc/view/web/season

| 字段  | 描述 |
| ----- | ---- |
| ep_id | EP号 |



### 番剧所属up

https://api.bilibili.com/pgc/season/episode/web/info?ep_id=702596

## 获取番剧详情页信息

###### https://api.bilibili.com/pgc/review/user

| 字段     | 必需 | 描述 |
| -------- | ---- | ---- |
| media_id | 是   | MD号 |
| ts       | 否   |      |



## 获取页面评论信息

https://api.bilibili.com/x/v2/reply/main

| 字段      | 必需 | 描述/默认值                       |
| --------- | ---- | --------------------------------- |
| oid       | 是   | CV号、AV号                        |
| type      | 是   | CV（12）AV（1）                   |
| next      | 否   | 当前页数                          |
| mode      | 否   | 1~3，3：按时间倒序；2：按热度降序 |
| plat      | 否   | 1                                 |
| callback  | 否   |                                   |
| jsonp     | 否   |                                   |
| csrf      | 否   |                                   |
| seek_rpid | 否   |                                   |





## 获取站内用户信息

###### https://api.bilibili.com/x/space/wbi/acc/info

| 字段         | 必需 | 描述   |
| ------------ | ---- | ------ |
| mid          | 是   | 用户id |
| token        | 否   |        |
| platform     | 否   |        |
| web_location | 否   |        |
| w_rid        | 否   |        |
| wts          | 否   |        |



###### https://api.bilibili.com/x/relation/stat

| 字段  | 必需 | 描述/默认值 |
| ----- | ---- | ----------- |
| vmid  | 是   | 用户mid     |
| jsonp | 否   | jsonp       |



## 用户稿件信息

###### https://api.bilibili.com/x/space/wbi/arc/search

| 字段          | 必需 | 描述/默认值 |
| ------------- | ---- | ----------- |
| mid           | 是   | 用户mid     |
| pn            | 否   |             |
| ps            | 否   |             |
| index         | 否   |             |
| order         | 否   | pubdate     |
| order_avoided | 否   | true        |
| platform      | 否   | web         |
| web_location  | 否   |             |
| w_rid         | 否   |             |
| wts           | 否   |             |



## 用户收藏夹信息

###### https://api.bilibili.com/x/v3/fav/folder/created/list

| 字段   | 必需 | 描述/默认值 |
| ------ | ---- | ----------- |
| up_mid | 是   | 用户mid     |
| pn     | 是   | 1           |
| ps     | 是   | 条目上限    |
| jsonp  | 否   | jsonp       |



## 用户已追番/剧信息

###### https://api.bilibili.com/x/space/bangumi/follow/list

| 字段  | 必需 | 描述/默认值     |
| ----- | ---- | --------------- |
| vmid  | 是   | 用户mid         |
| type  | 是   | 番（1）/剧（2） |
| jsonp | 否   | jsonp           |



## 用户最近投币的视频 x14

###### https://api.bilibili.com/x/space/coin/video

| 字段  | 必需 | 描述    |
| ----- | ---- | ------- |
| vmid  | 是   | 用户mid |
| jsonp | 否   | jsonp   |



### 在线人数

https://api.bilibili.com/x/web-interface/online?jsonp=jsonp



## 弹幕

https://comment.bilibili.com/1091578122.xml

https://api.bilibili.com/x/v1/dm/list.so?oid=54429686



https://api.bilibili.com/x/player/v2?aid=305180049&cid=893375964&ep_id=702596&season_id=43771







获取用户信息（简洁版）

https://api.bilibili.com/x/activity/live/personal?csrf=5cef7260a445a2acba6043d93bd3c0fd&rank_id=102



https://api.bilibili.com/x/activity/reserve/following?sid=1345061





笔记

https://api.bilibili.com/x/note/publish/info?csrf=5cef7260a445a2acba6043d93bd3c0fd&cvid=22911770



## 报错页漫画

https://api.bilibili.com/x/activity/operation/list?source_id=630edcfddbd0b39ca7371ad2



## 页面nav信息

https://api.bilibili.com/x/web-interface/nav

