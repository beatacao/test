# 比价系统前端重构
## 模块：比价助手-服装比价
*******************************************************************

### 一、任务管理页现有接口：
> 1、任务列表展示（公用：查询/价格系统或自己上传/分页/刷新）
- 方法：GET
- 请求地址：[/uploadTaskResult](http://127.0.0.1:8080/uploadTaskResult?currentPage=2&pageSize=10&type=1&isShowSelf=true&isShowPrice=true&searchString=%E5%B8%B8%E6%80%81&searchType=0&_=1496811164047)
- 请求参数：  
    ```
    {
        currentPage:1       //当前数据为第几页
        pageSize:10         //每页显示多少条
        type:1              //比价类型，服装-1
        isShowSelf:true     //是否展示自己上传/审核的任务
        isShowPrice:true    //是否展示系统上传的任务
        searchString:       //查询关键字
        searchType:0        //查询类型，档期名-0，清单ID-1，任务ID-2
        _:1496811164045
    }
    ```
- 响应数据
    ```
    {
        "pageSize": 10,
        "totalPage": 119,
        "currentPage": 1,
        "previousPageIndex": 1,     
        "pageIndex": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "nextPageIndex": 16,
        "pageIndexLength": 10,
        "totalRow": 1182,
        "startRow": 0,
        "previousPage": 1,
        "nextPage": 2,
        "resultRows": [
            {
                "id": 43773,
                "taskId": "bc5d40c8-e947-4069-a98e-2a7281f8f1ec",
                "processId": 43985,
                "ptBrandName": "上品top of the town",
                "skuCount": 1,
                "matchCount": null,
                "matchProductSnCount": null,
                "ownerName": "pricesystem",
                "ownerNumber": "1",
                "createTime": 1496719087000,
                "updateTime": 1496719087000,
                "type": 1,
                "upBrandName": "常态_销售主题TEST_1496719028489",
                "productList": [
                    "14967178322961"
                ],
                "isMultiBrand": 0,
                "completeRate": 0,
                "scheduleStartTime": 1509033600000,
                "scheduleEndTime": null,
                "transactionId": null,
                "verifyStatus": 0,
                "verifyOwnerName": "",
                "verifyOwnerNumber": "",
                "verifyTime": null,
                "upBrandNameWithStartTime": "10-27常态_销售主题TEST_1496719028489",
                "skuExceptionRate": null,
                "pricingJobDto": {
                    "id": 43985,
                    "taskId": "ed4d9077-04e6-47be-8545-281ff58387aa",
                    "ptBrandName": "上品top of the town",
                    "vipSkuCount": 1,
                    "otherSkuCount": 0,
                    "matchCount": 0,
                    "status": -1,
                    "createTime": 1496719087000,
                    "updateTime": 1496719087000,
                    "ownerNumber": "1",
                    "ownerName": "pricesystem",
                    "goodsListCode": null,
                    "xpBrandName": "",
                    "xpCreationDate": null,
                    "xpOnlineDatetime": null,
                    "type": 1,
                    "userType": null,
                    "siteId": null,
                    "siteInfoList": [],
                    "completeRate": null,
                    "brandName": null,
                    "prePrice": false
                }
            }
        ],
        "attach": null,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "hasPreviousIndex": false,
        "hasNextIndex": true
    }
    ```

> 2、提交任务 - 检查上传文件
- 方法：POST
- 请求地址：[/xiefu/check](http://127.0.0.1:8080/xiefu/check)
- 请求body: 通过 ajaxSubmit 提交表单附件；
- 响应数据   
    ```
    校验正确：
    {
        "code": 0,
        "ok": true,             
        "data": {
            "processId": null,
            "shopInfoPoList": null,
            "xpBrandName": "6-6比利时高端品牌JBC小童装PL2017053100047专场",
            "ptBrandName": "JBC",
            "multiBrand": false,    //混合专场，界面上有不同展示
            "existPricing": false   //提前比价，界面上有不同的展示；如果为false, 会去请求该品牌可定向抓取的店铺 
        }   
    }
    
    校验错误：
    {
        "code":0,
        "ok":false,             //校验错误
        "data":"文件类型错误！"    //提示信息
    }
    ```

> 3、提交任务 - 请求该品牌可定向抓去的店铺列表（弹窗的‘刷新’操作，共用该接口）
- 方法： POST
- 请求地址：[/xiefu/directUrl]()
- 请求body: 
    ```
    {
        "siteIds":"1001,1003,1011"  //该字段值是在程序里写死的
        "ptBrandName":"JBC"
    }
    ```
- 响应数据
    ```
    {
        "code": 0,
        "ok": true,     //如果为false, data字段为提示信息
        "data": [
            {
            "id": 99541,
            "siteId": 1011,
            "siteName": null,
            "ptBrandName": "JBC",
            "shopName": "jbc旗舰店",
            "shopUrl": "https://jbctz.tmall.com",
            "shopId": "9157d5ed-dbaa-413e-ad56-93a7ef445e31",
            "memo": "用户新增",
            "attention": 0,
            "descScore": 0,
            "serviceScore": 0,
            "deliveryScore": 0,
            "compScore": 0,
            "company": "\\N",
            "tel": "\\N",
            "createTime": null,
            "updateTime": null,
            "isDelete": 0,
            "isManual": 1,
            "isUsed": 1,
            "crawlerType": null,
            "stragety": null,
            "ptBrandNameAliasGroup": "JBC"
            }
        ]
    }
    ```

> 4、提交任务 - 确认导入比价清单
- 方法：表单提交POST
- 请求地址：[/xiefu/submitTask]()
- 请求body: 表单提交
- 响应数据：刷新当前页面

> 5、列表操作 - 重抓/放弃/完成
- 方法：GET
- 请求地址：[/admin/task/resetPricingTask/{taskId}/{status}](http://127.0.0.1:8080/admin/task/resetPricingTask/9f6cfc14-b790-4ad4-8dc4-f308be180358/0)
- 请求参数：taskId, status（重抓-0， 完成-2， 放弃-4）
- 响应数据
    ```
    {
        "msg": "重新抓取成功  taskId:401313c1-2540-418b-ab63-90cdb4fb9f2d",
        "success": true
    }
    ```

> 6、列表操作 - 启动任务  
1、弹窗：获取该品牌可定向抓取的店铺列表-/xiefu/directUrl  
2、确定，启动任务（/admin/task/startTask/{taskId}）
- 方法：GET
- 请求地址：[/admin/task/startTask/{taskId}]()
- 请求参数：
    ```
    {
        "taskId": "ed4d9077-04e6-47be-8545-281ff58387aa",
        "directUrlMatchPricingList[0].url": "http://shop.dangdang.com/13051",
        "directUrlMatchPricingList[0].crawlerType": "dangdang-directlist",
        "directUrlMatchPricingList[0].stragety": "dangdang-direct-strategy",
        "directUrlMatchPricingList[0].isUsed": 1,
        "directUrlMatchPricingList[0].siteId": 1003,
        "directUrlMatchPricingList[0].shopName": "臻臻上品工艺礼品旗舰店",
        "directUrlMatchPricingList[0].shopId": 13051
    }
    ```
- 响应数据
    ```
    {
        "msg": "启动任务成功  taskId:ed4d9077-04e6-47be-8545-281ff58387aa",
        "success": true
    }
    ```

> 列表操作 - 审核 - 重置任务  
1)弹窗：获取该品牌可定向抓取的店铺列表-/xiefu/directUrl  
2)选择或添加店铺，确定重置，执行‘重抓’

> 7、列表操作 - 审核 - 审核通过/款号错误（单个和批量操作共用）
- 方法：GET
- 请求地址：[/match/jiaju/updateVerifyStatus?userUploadHistoryId={ historyId}&status={status}](http://127.0.0.1:8080/match/jiaju/updateVerifyStatus?userUploadHistoryId=43773&status=1&_=1496823948982)
- 请求参数
    ```
    {
        "userUploadHistoryId": 43773,   //批量操作以逗号分割：43773,47655
        "status": 1,   //1:审核通过，2：款号错误
        "_": 1496823948982
    }
    ```
- 响应数据
    ```
    {"success":true}
    ```

> 8、列表操作 - 查看结果 - getIsHandle
- 方法：GET
- 请求地址： [/getIsHandle](http://127.0.0.1:8080/getIsHandle?ptBrandName=JBC&_=1496826014041)å
- 请求参数：
    ```
    {
        "ptBrandName": "JBC"
    }
    ```
- 响应数据
    ```
    {"status":true}
    ```

*****************************************************************

### 二、任务详情页现有接口
> 1、获取审核状态（价格系统上传的任务）
- 方法：GET
- 请求地址：[/match/jiaju/getVerifyStatus]()
- 请求参数：
    ```
    {"userUploadHistoryId": 43328}
    ```
- 响应数据
    ```
    {
        "status":0      //0-未审核；1-审核通过；2-款号错误
    }
    ```

> 2、获取匹配数据列表（查询/分页共用）
- 方法：GET
- 请求地址：[/match/jiaju/getMatchTrackList]()
- 请求参数：
    ```
    {
        "currentPage": 1,
        "pageSize": 10,
        "isHaitao": 0,
        "hasException": 0,
        "goodsShowType": 0,
        "priceModule": 1,
        "minPricePercent": -90,
        "maxPricePercent": 200,
        "minSimilarScore": 0.7,
        "taskId": "bf55f46b-5adc-4568-945d-cb6759c4f53a",
        "userUploadHistoryId": 255995,
        "opponLimit": 5,
        "type": 1,
        "siteList[0]": 1001,
        "siteList[1]": 1011,
        "siteList[2]": 1016,
        "_": 1496832167711,
    }
    ```
- 响应数据
    ```
    {
        "pageSize": 10,
        "totalPage": 7,
        "currentPage": 1,
        "previousPageIndex": 1,
        "pageIndex": [1, 2, 3, 4, 5, 6, 7],
        "nextPageIndex": 7,
        "pageIndexLength": 10,
        "totalRow": 63,
        "startRow": 0,
        "previousPage": 1,
        "nextPage": 2,
        "resultRows": [
            {
            "taskId": "bf55f46b-5adc-4568-945d-cb6759c4f53a",
            "productCode": "MF1BD007171434",
            "productUrl": "https://www.vip.com/detail-1086566-172536862.html",
            "productName": "时尚百搭显瘦阔腿裤",
            "imgUrl": "https://a.vpimg4.com/upload/merchandise/pdc/385/232/7446778352329232385/0/1953459-5.jpg",
            "productPrice": 86,
            "totalB2cSize": 1,
            "productSn": "MF1BD007",
            "matchB2CVos": [
                {
                "productCode": "44126708001",
                "productName": "MIGAINO/曼娅奴旗舰店春季女装时尚印花百搭短裤显瘦休闲裤热裤女",
                "productUrl": "https://detail.tmall.com/item.htm?id=44126708001&rn=5f96ce465d24127062f1367a41f36b88&abbucket=6",
                "productPrice": 109,
                "bLowest": 1,
                "bException": 2,
                "siteId": 1011,
                "siteName": "天猫商城",
                "shopName": "曼娅奴旗舰店",
                "diffPrice": -0.21100917,
                "similarScore": 1,
                "isCheck": 0,
                "isDelete": 0,
                "imgUrl": "https://img.alicdn.com/bao/uploaded/i4/TB1qB5tRFXXXXX1XpXXXXXXXXXX_!!0-item_pic.jpg_180x180.jpg",
                "matchId": "69505828",
                "productSn": "MF1BD007",
                "comment": null,
                "guidePrice": null,
                "couponStr": null,
                "guidePriceAndCouponStr": null,
                "updateTime": null,
                "errorType": null,
                "ownerName": null,
                "lastOperationTime": null,
                "durativeIndex": 0,
                "matchTrackId": null
                }
            ]
            }
        ],
        "attach": [
            {
            "id": 255995,
            "taskId": null,
            "processId": 296763,
            "ptBrandName": "曼娅奴MIGAINO",
            "skuCount": 492,
            "matchCount": 459,
            "matchProductSnCount": 73,
            "ownerName": "pricesystem",
            "ownerNumber": "1",
            "createTime": 1496888162000,
            "updateTime": 1496888425000,
            "type": 1,
            "upBrandName": "曼娅奴MIGAINO女装专场",
            "productList": null,
            "isMultiBrand": 0,
            "completeRate": null,
            "scheduleStartTime": null,
            "scheduleEndTime": null,
            "transactionId": "181268",
            "verifyStatus": 0,
            "verifyOwnerName": null,
            "verifyOwnerNumber": null,
            "verifyTime": null,
            "upBrandNameWithStartTime": null,
            "skuExceptionRate": 6.32,
            "pricingJobDto": null
            },
            {
            "MF2AA021": [
                "MF2AA021240234",
                "MF2AA021240236"
            ]
            }
        ],
        "hasPreviousPage": false,
        "hasNextPage": true,
        "hasPreviousIndex": false,
        "hasNextIndex": true
    }
    ```
> 3、下载全部结果
- 方法：GET
- 请求地址：[/match/jiaju/exportJiaJuResult/{userUploadHistoryId}]()
- 请求参数：userUploadHistoryId
- 响应数据：通过对响应头信息设置，直接下载

> 4、匹配清理
- 方法：GET
- 请求地址：[/cleanMatchDate/cleanByTaskId?taskId={taskId}]()
- 请求参数：taskId
- 响应数据
    ```
    {"status":"success","cleanMatchDataSize":0}
    ```
> 5、删除匹配 - 本地无数据，待定

> 6、查看对手历史价格  
- 方式：GET
- 请求地址：[/price/priceHisList?siteId={siteId}&productCode={productCode}]()
- 请求参数：siteId；productCode
- 响应数据
    ```
    {
        "maxPrice": 329,
        "minPrice": 329,
        "guidePrice": 309,
        "couponStr": "满299.0减20.0",
        "guidePriceAndCouponStr": "com.vipshop.dp.core.productdatamgr.pojo.CrawlerProductStatHis@a618320 满299.0减20.0",
        "priceList": [
            {
            "id": 167688551,
            "siteId": 1001,
            "productCode": "1683075968",
            "productName": "曼娅奴 2016高端时尚女装短袖高腰显瘦修身圆领连衣裙MF3DA066 黑色 155/80A/S",
            "productPrice": 329,
            "band": null,
            "consultingNum": null,
            "appraisalNum": 3,
            "soldNum": null,
            "flagStock": 0,
            "flagPromotion": null,
            "flagShoppingRush": null,
            "imgPath": null,
            "productUrl": "http://item.jd.com/1683075968.html",
            "creationDate": 1489653792000,
            "lastUpdateTime": null,
            "marketPrice": 0,
            "guidePrice": 229,
            "couponStr": "满299.0减100.0"
            }
        ]
    }
    ```

> 7、店铺管理 - showShopManage
 - 方法：GET
 - 请求地址：[/showShopManage]()
 - 请求参数
    ```
    {
        "ptBrandName": "JBC"
        "isHandle": 0
        "_": 1496826014043
    }
    ```
- 响应数据
    ```
    [
        {
            "siteId": 1035,
            "siteName": "亚马逊海淘",
            "deletList": [],
            "otherList": [
                {
                    "shopType": 0,
                    "shopItems": [
                        {
                            "id": 620545,
                            "shopName": "亚马逊",
                            "isDel": 2,
                            "type": 0,
                            "isContain": false,
                            "isSelected": true
                        }
                    ]
                }
            ],
            "shopCount": null,
            "typeShopList": [
            {
                "shopType": 0,
                "shopItems": [
                    {
                        "id": 620545,
                        "shopName": "亚马逊",
                        "isDel": 2,
                        "type": 0,
                        "isContain": false,
                        "isSelected": true
                    }
                ]
            }
            ]
        }
    ]
    ```

> 8、店铺管理 - 删除/保存店铺  
- 方法：POST
- 请求地址：[/changeIsDelStat]()
- 请求body：
    ```
    {
        "ptBrandName": "JBC",
        "ids": 620544,88888923,972839,
        "isDel": 2
    }
    ```
- 响应数据
    ```
    {"status":true}
    ```

> 9、店铺管理 - 确定
- 方法：GET
- 请求地址： [/confirmShopManage](http://127.0.0.1:8080/confirmShopManage?ptBrandName=JBC&_=1496826014045)
- 请求参数：
    ```
    {
        "ptBrandName": "JBC"
    }
    ```
- 响应数据
    ```
    {"status":true}
    ```


### 待添加接口
> 用户信息  

> 任务详情页 - 头部信息（款数、有匹配款数等）及B2C商城列表（返回数据需包含国内或海淘标识）

> 合并小的http请求接口

**************************************************************************

## 前端重构实现细节  

> 兼容浏览器  

> 组件划分 - 任务管理页面  

- 左侧菜单（公用组件）  
    - 菜单展示
    - 菜单栏整体收起/展开；菜单栏每一个栏目的折叠/展开
- topbar (公用组件)
- 提交任务（提取公用组件：弹窗，消息提示弹窗）  
- 条件查询 （公用组件）
- 任务列表展示 （公用组件）  
- 分页 （公用组件）
- 登录验证
- 返回顶部
- ngprogress

> 测试相关



