# 简介
支持搜索小说、订阅小说、在线阅读
## 效果图

![Octicons](http://i4.bvimg.com/1949/acdbf4a368ecdbb5.gif)


## 后台API服务器代码地址

https://github.com/dlyt/YCool_Server.git

## 功能列表
- [x] 下拉刷新
- [x] 左滑删除


## 安装
```bash
git clone https://github.com/dlyt/YCool.git
npm install
```
注意导入的2个包

  react-native-device-info 需要配置

    1. 右击选择项目名称 选择Add Files to '你的项目名'
    2. 进入node_modules/react-native-device-info
    3. 添加 .xcodeproj文件
    4. 在Xcode中点击你的工程名字——>Build Phases——>Link Binary With Libraries——>点击 '+'号按钮，添加libRNDeviceInfo.a文件

  react-native-swipeout 需要替换一下这个包里的index.js文件

  [index.js.zip](https://github.com/dancormier/react-native-swipeout/files/340703/index.js.zip)

## 开发环境

IOS  6S


## License

仅供学习使用
