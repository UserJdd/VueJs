#### ICP备案查询
---
##### 请求示例
请求类型：`GET`

请求地址：`https://vue.md/Api.icp/icp`

请求示例：`https://vue.md/Api.icp/icp?domain=你的域名&token=你的Token`

---
##### 请求参数
参数|类型|示例|说明
---|---|---|---
`domain`|text|`baidu.com`|查询域名
`token`|text|`hg58Rgb.ghc`|Token令牌

---
##### 响应示例
```json
{
    "status": 200,
    "msg": "请求成功",
    "data": {
        "Name": "baidu.com",
        "NameId": 10000245113,
        "ICP": "京ICP证030173号-1",
        "UnitName": "北京百度网讯科技有限公司",
        "List": "企业",
        "Time": 1677906116
    }
}
```




