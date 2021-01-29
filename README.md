# 优惠券状态 useState

    0  未使用
    1  已使用
    2  已过期

## 上传图片类型参数

public enum ImageType : byte
    {
        营业执照
        </summary>
        License = 1,
        头像
        </summary>
        StaffPhoto,  2
        售后图片  
        </summary>
        AfterSales,  3
    }

## 短信类型验证图片验证码

  账号注册  0
  
  找回密码  1
  
  换绑手机  2
  
  绑定新手机  3

## 领券中心领取状态

  Receivable  True未领取  False已领取

## 订单文件限制类型

  cdr,eps,jpg,jpeg,tiff,tif,rar,zip,pdf

传TakeOrderWay值就可以了 1代客下单 2客户自助

## 产品提示，提示类型枚举值

    产品提示类型
    产品
        Product = 0,

    部件
        Part = 1,

    数量
        Number = 2,

    尺寸
        Size = 3,

    物料
        Material = 4,

    属性
        Property = 5