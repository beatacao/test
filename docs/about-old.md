# 比价重构前相关实现 及 后期迭代（迭代记录从2017.6.19开始）

一、比价助手 - 任务管理页

1、右侧模板（5个）：
    table模板：（2个）
    js:(3个)
    服装，鞋类，体用，箱包 
    - view/price/common/uploadTaskxiefu.jsp
    - js: app/module/price/common/uploadTaskXiefu.js
    - list模板：view/price/upTablePS.jsp

    饰品 - common/uploadtaskshipin.jsp
    - js/list模板同鞋类

    c3，母婴 - common/uploadTaskPS.jsp
    -js: uploadTaskPS.js
    -list模板：同鞋类

    家居,美妆 - common/uploadTaskPS2.jsp
    -js: uploadTaskPS.js
    -list模板：同鞋类

    其他 - common/uploadTask.jsp
    -js: uploadTaskNew.js
    -list模板：upTable1.jsp

2、table列表 - ‘查看’一栏展示逻辑：modules/taskStatus.js
    美妆无店铺管理

3、提交任务
    - 模板（7个）：views/price/**/uploadTask or uploadTaskNew

二、比价助手 - 任务详情

模板：
前端模板定位： hash = #route/match/jiaju/matchDataJudge4JiajuXiefu
java根据参数定位模板（7个模板）：
/crawler-pricing/src/main/resources/methodUrl.properties

js: 7个模板共用 - modules/matchData.js

1、国内/海淘：只有母婴和非标品（鞋服）
- 去除步骤：
    1、去除任务详情页相关dom - 2个模板(xiefu & muying)
    2、去除人物详情页dom相关操作 - matchData
    3、去除任务管理页‘查看结果’模板定位时的参数传递： isHaiTao （任务管理页3个js 中 matchDataJudge4JiajuXiefu）
    4、去除查询/过滤 请求参数 isHaiTao - matchData.js
    5、后端去除: 前端去除参数影响到的方法：match/jiaju/getMatchTrackList & match/jiaju/matchDataJudge4JiajuXiefu
    
- 去除‘店铺管理’
    1、去除模板中dom
    2、去除相关dom绑定事件： matchdata.js

