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

## 售后申请类型（诉求意向）

  退货退款  0
  
  补印  1
  
  减款  2
  
  其他  255

## 售后状态（问题反馈状态）

  已提交  0
  
  处理中  1
  
  处理成功  2

  已拒绝 3
  
  已取消  255
