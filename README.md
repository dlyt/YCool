# 简介
这是一个用React Native写的小说APP，支持搜索小说、订阅小说、在线阅读。

后台API服务器代码地址：https://github.com/dlyt/YCool_Server.git
## 效果图
![Octicons](http://i4.bvimg.com/1949/acdbf4a368ecdbb5.gif)
## 目录结构
```
.
├── app                       # 程序源文件         
│   ├── actions               # actions
│   ├── containers            # 容器
│   ├── imgs                  # 图片
│   ├── lib                   # 工具文件夹
│   └── reducers              # reducers
└── index.ios.js              # 程序入口文件
```
## 技术栈
1.导航系统 NavigationExperimental
- NavigationRootContainer允许导航的各个状态(屏幕）保存在app的最顶层。
  - 使用reducer在导航状态中声明设置转换过渡
  - 可以将state永久保存存到硬盘，这样刷新和app更新后，还能获得之前的导航状态
  - 监听打开中的url链接，BackAndroid便于支持返回按纽
- NavigationReducers 包含了预置的reducers, 用来管理导航状态之间的转换过渡。
  - Reducers可以彼此之前进行组合，设置更高级的导航逻辑
- 导航逻辑可以用于任何的视图
- NavigationAnimatedView 是一个用来管理不同场景动画的组件，也可以用于Navigator和NavigatorIOS组件 
 - 每一个scene可以完全自定义，并且管理它自己的动画和手势
 - 可以有一个Overlay/header, 用于跟场景的动画同步
- NavigationCard 和NavigationHeader可以作为预编译的scenes和overlays. 然后跟NavigationAnimatedView一起使用

2.数据管理 redux

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action，一个描述发生什么的对象。为了描述 action 如何改变 state 树，你需要编写 reducers。

action和reducers的代码写在相应文件夹里，可以到项目中去看，下面是注册store的代码。

index.ios.js
```js
const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('YCool', () => App)
```

3.数据请求

`axios`

统一设置token验证信息：

app/lib/setAuthorizationToken.js
```js
import axios from 'axios'

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
```

4.中间件 redux-thunk, redux-logger

下面是一段登录的action，来说明`redux-thunk`的用处
```js
export function login(user) {
  return dispatch => {
    return axios.post('/api/auth', user).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwtDecode(token)))
    })
  }
}
```
如果不添加 redux-thunk 这个中间件这段代码是会保错的，提示如下：
```js
Actions must be plain objects. Use custom middleware for async actions.
```
这里，要先知道：

通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。

下面的代码更容易我们理解
```js
const foo = () => {
	let bar = 'before'
	setTimeout(() => {
    bar = 'after'
  }, 3000)
  return {
  	bar
  }
}

document.getElementById('demo').innerHTML = foo().bar
```
由于 foo 中回传的 bar 在 return 之时是为 'before' ,并不会等到 setTimeout 结束后在被 assign 的 'after'。

如果不引入 thunk 它只有同步操作。每当 dispatch action 时，state 会被立即更新。这时候使用异步操作就会报错。

我们解决这个问题就可以使用 redux-thunk ，它是通过中间件（middleware）的形式被引用。

这句话有助于你理解 middleware： `它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。`

middleware 改造了你的 dispatch ，让它有能力判断送进去的东西是一个 pure object 还是 function 。

我们先看一下 redux-thunk 是如何使用的。
```js
import thunkMiddleware from 'redux-thunk'
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,    // 允许我们 dispatch() 函数
      loggerMiddleware    // 一个很便捷的 middleware，用来打印 action 日志
    ),
  )
)
```
redux-thunk 的源码中，首先判断是否是 function :
```js
if (typeof action === 'function'){}
```
如果不是 function ，那自然就是一个 pure object ,利用 next 送出，什么也不需要做；若是 function ,则把这个 thunk 需要的 dispatch , getState 和其他 arguement 传给 thunk ,让它做你所指定它做的事情。

redux-logger 这个中间件会在控制台打印出 action 如图，有助于开发。
![](http://cdn.tycocn.com/react-login.png)

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
