### jsx的特点
增强js语义；
结构清晰；
抽象程度高；
代码模块化；

### JSX如何判断条件和渲染列表
if/else
```jsx
class App extends React.Component {
  // …
  render () {
    if(this.state.mode === 'view') {
      return (
        <div>
          <p>Text: {this.state.text}</p>
          <button onClick={this.handleEdit}>
            Edit
          </button>
        </div>
      );
    } else {
      // 译者注：如果if代码块里有return时，一般不需要写else代码块，不过为了贴合标题还是保留了
      return (
        <div>
          <p>Text: {this.state.text}</p>
            <input
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          <button onClick={this.handleSave}>
            Save
          </button>
        </div>
      );
    }
}
```
返回null阻止渲染

变量
```jsx
renderInputField() {
    let input;
    
    if (this.state.mode !== 'view') {
      input = 
        <p>
          <input
            onChange={this.handleChange}
            value={this.state.inputText} 
          />
        </p>;
    }
      
    return input;
  }
  
  renderButton() {
    let button;
    
    if (this.state.mode === 'view') {
      button =
          <button onClick={this.handleEdit}>
            Edit
          </button>;
    } else {
      button =
          <button onClick={this.handleSave}>
            Save
          </button>;
    }
    
    return button;
  }
```
三元运算符
```jsx
return (
    <div>
    <p>Text: {this.state.text}</p>
    
    {
        ...
    }

    <button
        onClick={
        view 
            ? this.handleEdit 
            : this.handleSave
        } >
            {view ? 'Edit' : 'Save'}
    </button>

    </div>
);
```
短路运算符
```jsx
class App extends React.Component {
  state = {
    text: '',
    inputText: '',
    mode: 'view',
  }
  
  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
  }
  
  handleSave = () => {
    this.setState({ text: this.state.inputText, mode: 'view' });
  }

  handleEdit = () => {
    this.setState({mode: 'edit'});
  }
  
  render () {
    const view = this.state.mode === 'view';
    
    return (
      <div>
        <p>Text: {this.state.text}</p>
        
        {
          !view && (
            <p>
              <input
                onChange={this.handleChange}
                value={this.state.inputText} />
            </p>
          )
        }
        
        <button
          onClick={
            view 
              ? this.handleEdit 
              : this.handleSave
          }
        >
          {view ? 'Edit' : 'Save'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
自执行函数
```jsx
{
  (() => {
    const handler = view 
                ? this.handleEdit 
                : this.handleSave;
    const label = view ? 'Edit' : 'Save';
          
    return (
      <button onClick={handler}>
        {label}
      </button>
    );
  })()
} 
```
子组件
```jsx
render () {
    const view = this.state.mode === 'view';
    
    return (
      <div>
        <p>Text: {this.state.text}</p>
        
        {
          view
            ? <EditComponent handleEdit={this.handleEdit}  />
            : (
              <SaveComponent 
               handleChange={this.handleChange}
               handleSave={this.handleSave}
               text={this.state.inputText}
             />
            )
        } 
      </div>
    );
}
```
If组件
```jsx
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;
  
  return condition ? positive : negative;
};

// …

render () {
    const view = this.state.mode === 'view';
    const editComponent = <EditComponent handleEdit={this.handleEdit}  />;
    const saveComponent = <SaveComponent 
               handleChange={this.handleChange}
               handleSave={this.handleSave}
               text={this.state.inputText}
             />;
    
    return (
      <div>
        <p>Text: {this.state.text}</p>
        <If
          condition={ view }
          then={ editComponent }
          else={ saveComponent }
        />
      </div>
    );
}
```
高阶组件
```jsx
function withEither(conditionalRenderingFn, EitherComponent) {
    return function buildNewComponent(Component) {
        return function FinalComponent(props) {
            return conditionalRenderingFn(props)
                ? <EitherComponent { ...props } />
                 : <Component { ...props } />;
        }
    }
}
```

###  react的事件处理会丢失this,所以需要绑定,为什么会丢失this?
解决办法：
第一种,在constructor里面用bind绑定this
第二种,声明方法的时候使用箭头函数(静态方法指向实例)
第三种,调用的时候使用箭头函数

原因： 
this 默认是 undefinded
1. this指向与定义时无关，与运行时有关，哪个对象调用，它就指向谁。

event 不是原生的 event 是 syntheticEvent（组合事件）


bind
```js
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```
call
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```
### react 受控组件
input  onChange 类似 v-model 自我实现； 表单中的值受 state 控制

必须自己操作 dom 元素


### React事件和DOM事件的区别
react 的事件是绑定在 document 上的，原生事件是绑定在 dom 上的。

### React父子组件通讯
父子组件通过 props 传值或者函数

react 组件间通讯是单向的。数组必须是由父级传到子级或者子级传递给父级。
兄弟组件通讯，要先传给父级再传给兄弟组件

父组件可以向子组件通过传 props ，通讯
子组件调用父组件 props 函数，将要传的值通过参数传到父组件中

兄弟组件传值要先传父再传兄，所以可以引入全局状态管理 redux


context, 自定义事件

### setState为何使用不可变值
state 值不可改变，如需改变，需要用 setState

数组：
数组追加 concact, [...this.state.list, 100], slice, filter
不可以用 push, pop, splice
对象：
Object.assign({}, this.state.obh, {a: 100})
{...this.state.obj, a: 100}

如何拿到最新的值：
setState方法加个参数，函数接收
setTimeout 里面 setState 方法是同步的
自己定义的事件，document.body.addEventListener('click', () => {}) 同步


减少render，判断一个复杂的数据对象是否跟之前的值相同不容易，所以才有不可变数据对象，只需浅比较是否为同一个数据对象地址；

浅比较：比较 Object.keys(state | props) 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。

为什么 React 不同步地更新 this.state？
等组件内所有 setState 完成后，可以避免不必要的重新渲染来提升性能

为什么 React 不能立即更新 this.state，而不对组件进行重新渲染呢?
会破坏掉 props 和 state 之间的一致性

如何在Reactjs中减少render?
state 的值改变就会重新渲染，哪怕是相同的值重新输入，官方提供了一个函数可以阻止 render :shouldComponentUpdate。

如何创建不可变数据对象
immutableJS
优缺点：
  深拷贝引用都改变；Object.assign 其他属性都复制；
  获取组件属性必须用 get getIn 与原生 . 写麻烦；库体积大；调试困难；

### setState是同步还是异步
setState 在生命周期函数和合成函数中的是异步更新；

为了性能优化，将 state 等到最后批量合并再渲染；

会触发 ReactDefaultBatchingStrategy 事务的 batchUpdates 方法，将批量更新标志设置为 true，存储到 dirtyComponents 中，批量更新；

setState 在 setTimeout、原生时间和 async 函数中都是同步更新；

### setState 何时合并state
setState 方法会被合并，但传入函数不会被合并；

### React组件生命周期
1，设置组件默认属性
static
2，初始化状态
constructor
componentWillMount，render，componentDidMount
1，组件收到属性时触发
componentWillReceiveProps
shouldComponentUpdate，componentWillUpdate，componentDidUpdate，componentWillUnmount，componentDidCatch

### React 函数组件和 class 组件有何不同
函数组件：
纯函数，输入props，输出JSX
没有实例，没有生命周期，没有state
不能扩展其他方法


16.8 之后加入了 hooks，可以使用 useState 管理 state，和使用生命周期函数：
  状态管理，函数组件是无状态组件，如果要使用 state 可以从父组件传 props;
  没有生命周期；
调用方式（为什么类组件中 this 是可变的）
  函数组件重新渲染将重新调用组件方法返回 react 元素；
  类组件将重新 new 一个新的组件实例，然后调用；
获取渲染时的值
  类组件触发延时事件时，会获取最新的 props，而不是触发时的 props；
    导致的原因是 this 变了；
    解决办法1：读取当前 props，显示传递；不好会导致代码冗余；
    解决办法2：闭包
  函数组件
    函数式组件捕获了渲染所使用的值
### 什么是React非受控组件
形式上说：
  受控组件就是为某个 form 表单组件添加 value 值；
    好处：容易实现对用户输入的验证；
    富文本编辑器
  非受控组件就是没有添加 value 属性的组件； 可以通过 ref 来从 DOM 获得表单值；defaultChecked, defaultValue
### 什么场景需要用 React Portals
portals 做了什么？
  render 到一个组件里面去，实际改变的是网页上另一处的 dom 结构；
模态框，弹出框，抽屉

逃离父组件；css 特定场景下
### react context
为什么需要使用 context?
单向数据流在某些场景下不适用；
介绍：
值在组件间共享，不必通过 props 显式地逐级传递；
themeContext.Provider ThemeButton.contextType = ThemeContext static contextType = ThemContext const theme = this.context ThemeContext.Consumer
### React 如何异步加载组件
React.lazy(() => import('./ContextDome'))
React.Suspense

### React性能优化-SCU的核心问题在哪里
React 父组件有更新，则子组件无条件更新

1，减少 diff 算法触发次数。
  setState 优化，非更新阶段（ timeout/Promise ）只调用一次 setState。
  父组件 render 会触发子组件 update ，this.props 和 this.state 浅比较或使用 PureComponent。
2，缩短 SCU 方法的执行时间。
3，没必要的渲染返回 false。

组件尽可能的细分，比如一个input+list组件，可以将list分成一个PureComponent，只在list数据变化时更新。否则在input值变化页面重新渲染的时候，list也需要进行不必要的DOM diff

增加key后，React就不是diff，而是直接使用insertBefore操作移动组件位置，而这个操作是移动DOM节点最高效的办法。

箭头函数在每一次 render 的时候都会生成新的箭头函数
  例：Test组件的click属性是个箭头函数，组件重新渲染的时候Test组件就会因为这个新生成的箭头函数而进行更新，从而产生Test组件的不必要渲染。
### SCU默认返回什么
### PureComponent和memo
但是在使用PureComponent只能在es6 中的class组件使用，但memo却可以在function Component中使用
memo 和 PureComponent 的作用是一样的，不同的是 memo 生成函数组件，浅比较的是 Props，PureComponent 生成 class 组件，比较的是 Props 和 State

### 高阶组件 
HOC：
接收一个组件，返回一个组件； 和公共逻辑进行拼装；增加组件层级
connect:
const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList)
Render Props：
核心思想：通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件；代码简洁，学习成本高


### Redux
dispatch(action) => reducer -> newState => subscribe 触发通知
view => action => Dispatch => Reducer => state
### react-redux
provider => connect => mapStateToProps, mapDispatchToProps  

### 函数式编程
纯函数，不可变值

### vdom 和 diff
h函数 传入tag,属性，子节点，返回 vnode 数据结构；patch函数把vnode函数渲染dom节点，新的vnode结构更新到旧的vnode结构上
vnode 结构
{
    tag: 'div',
    props: {
        className: 'container',
        id: 'div1'
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'
        },
        {
            tag: 'ul',
            props: {
                style: 'front-size: 20px' }
                children: []
            }
        }
    ]
}

diff 
只比较同一层级，不跨级比较
tag 不相同，则直接删掉重建，不再深度比较
tag 和 key，两者都相同，则认为是相同节点，不再深度比较

h函数（React.createElement)生成Vnode
patch 进行对比
  执行 pre hook
  第一个参数不是 vnode 则创建一个空的 vnode, 关联到dom元素
  相同 vnode 则 patchVnode 
  不相同则删除重建

updateChildren 
updateChildren：
oldStartIdx,oldEndIdx 中间重合停止
开始和开始对比，最后和最后对比，开始和结束对比，结束和开始对比 
sameVnode key 和 sel 相等既相同
patchVnode(
    对比 oldVnode 和 newVnode；执行 prepatch hook；设置 vnode.elem；hook 相关；
    比较 text, children；addVnodes removeVnodes setTextContent updateChildren
)
newCh 中的 key 与所有 oldCh 进行对比；没有对应上，则新增；key 对应上则比较 sel; 都相等则 patchVnode

### react 五大特点
虚拟DOM，组件化，声明式，单向数据流和纯粹JavaScript语法

单向数据流：即规范了数据的流向——由外层组件向内层组件进行传递和更新。 
而react在这方面的处理，就是直接规定了(对组件而言，它的)props是只读的，而不是可更改的；

### JSX的本质
 React.createElement 生成vnode
const imgElem = <div> <p>some text</p><img src={imgUrl} /></div>
var imgElem = React.createElement('div', null, React.createElement('p', null, 'some text'), React.createElement('img', {src: imgUrl}))

### 合成事件
1. event 是 SynthetivEvent ，模拟出来 DOM 事件所有能力
2. event.nativeEvent 是原生事件对象（MouseEvent）
3. 所有的事件，都被挂载到 document 上
4. 和 DOM 事件不一样，和 VUE 事件也不一样

div 事件冒泡至顶层 document => 合成事件层 实例化成统一的react event syntheticEvent event => 事件处理函数  dispatchEvent event 对象交由对应的处理器执行

### 为什么要用合成事件机制
更好的兼容性和跨平台
挂载到 docoment ，减少内存消耗，避免频繁解绑
方便事件的统一管理（如事务机制）

### setState 主流程
this.setState => newState 存入 pending 队列 => 是否处于 batch update => 如果处于 BU 保存组件于 dirtyComponents 中
=> 不处于则遍历所有 dirtyComponents 调用 updateComponent 更新 pending state or props

是否处于 batchUpdate 根据 isBatchingUpdates = true
开始的时候 is = true, 结束的时候 is = false , setTimeout 时 is = false 所以

### setState 异步还是同步
setState 无所谓异步还是同步，看能否命中 batchUpdate 机制，这就需要判断 isBatchingUpdates

哪些能命中 batchUpdate 
    生命周期（和它调用的函数）
    React 中注册的时间（和它调用的函数）
    React 可以管理的入口

setTimeout setInterval
自定义dom事件
react 管不到的入口
### transaction 事务机制
initialize anyMethod close
transaction.initialize = () => {}
transaction.close = () => {}
function method() {}
transaction.perform(method)

### JSX 如何渲染为页面
而在 React 中，我们通过使用JavaScript 对象来渲染 UI 元素。
而对于 JSX 的概念在这里我就不再进一步阐述了，你大可以将它理解为一种简洁，高效创建 React 元素的语法糖，用来更加优雅的构建整个应用的虚拟 DOM。
// 使用 ReactDOM.render API
ReactDOM.render(
  element,
  document.getElementById('root')
);
React.createElement 创建，ReactDom.render 渲染
### setState 之后如何更新页面

### 组件渲染过程
props, state => render() 解析 jsx 结构，生成 vnode => patch(elem, vnode)

### 组件更新过程
setState(newState) => dirtyComponents（可能是子组件） => render() 生成 newVnode => patch(vnode, newVnode)
上述的 patch 被拆分为两个阶段：
    reconciliation阶段 - 执行diff算法，纯JS计算
    commit 阶段 - 将 diff 结果渲染 DOM
为什么要分2个阶段
    JS是单线程，且和Dom渲染共用一个线程，当组件足够复杂，组件更新时计算和渲染都压力大，同时再有DOM操作需求，将卡顿
    解决方案：将 reconciliation 阶段进行任务拆分（commit 无法拆分），DOM 需要渲染时暂停，空闲时恢复
    什么时候知道 dom 需要渲染，通过 window.requestIdleCallback

维护每一个分片的数据结构，就是Fiber。React团队把这个功能命名为Fiber（纤维），含义也是更加紧密的处理机制，比Thread（线程）更细。

### React 原理
函数式编程（数据是不可变的，纯函数）；vdom 和 diff；JSX 本质；合成事件；setState batchUpdate；组件渲染过程；fiber；

### 组件之间如何通讯？
props, context, redux, 自定义事件

### context 是什么，如何应用
父组件，向其下所有子孙组件传递信息（语言，颜色）

### 什么是纯函数
返回一个新值，没有副作用（不会修改其他值）；不可变值；如 arr1 = arr.slice()

### ajax 请求应该放在哪个生命周期
componentDidMount

### 函数组件和 class 组件区别
纯函数，输入 props，输出JSX
没有实例，没有生命周期，没有state
不能扩展其他方法

### 什么是受控组件
表单的值，受 state 控制
需要自行监听 onChange ,更新 state

### 多个组件有公共逻辑，如何抽离
高阶组件 HOC 
Render Props

### react-router 如何配置懒加载
const Home = lazy(() => import('./routers/home'))
const APP = () => (
    <Router>
        <Suspense>
)

### pureComponet 有何区别
实现了浅比较的shouldComponentUpdate，优化性能，结合不可变值；

### React 事件和 DOM 事件的区别
所有事件挂载到 documnet 上
event 不是原生的，是 syntheticEvent 合成事件对象
dispatchEvent 机制

### React 性能优化
渲染列表时加key
自定义事件，DOM 事件及时销毁
合理使用异步组件
减少函数 bind this 的次数
合理使用 SCU PureComponent 和 memo
合理使用 immutable.js

### React 和 Vue 的区别
都支持组件化，都是数据驱动视图；都是数据驱动视图；都使用 vdom 操作 DOM；

React 使用 JSX 拥抱 JS，Vue 使用模板拥抱 Html
React 函数式编程（setState），Vue 声明式编程（赋值 a = 100）
React 一些东西需要自己添加，Vue 全面一些

### class 组件的问题
大型组件很难拆分和重构，很难测试
相同业务逻辑，分散到各个方法中，逻辑混乱
复用逻辑变的复杂

### useReducer 和 redux 的区别
useReducer 是 useState 的代替方案，用于 state 复杂变化
useReducer 是单组件状态管理，组件通讯还需要 props
redux 是全局的状态管理，多组件共享数据

### useMemo 使用总结
React 默认会更新所有子组件
class 组件使用 SCU 和 PureComponent 做优化
Hooks 中使用 useMemo，但优化原理相同

### Hooks 使用规范
只能用于 React 函数组件和自定义 Hook 中，其他地方不可以
只能用于顶层代码，不能在循环，判断中使用 Hooks; 不能在它上面打断它，提前return；因为 Hooks 严重依赖于调用顺序；

### Mixins 的问题
变量作用域来源不清
属性重名
引入过多会导致顺序冲突

### HOC 的问题
组件层级嵌套过多，不易渲染，不易调试
HOC 会劫持 props，必须严格规范，容易出现疏漏

### Render Prop
学习成本高，不易理解
只能传递纯函数，而纯函数功能有限

### Hooks 做组件逻辑复用的好处
完全符合 Hooks 原有规则，没有其他要求，易理解记忆
变量作用域明确
不会产生组件嵌套

### React Hooks 注意事项
useState 初始化值，只有第一次有效
useEffect 内部不能修改 state（可以使用 useRef 解决）
useEffect 依赖引用类型，会出现死循环； 

### 为什么使用 Hooks
完善函数组件的能力，函数更适合 React 组件；
组件逻辑复用，Hooks 表现更好；
class 复杂组件正在变得费解，不易拆解，不易测试，逻辑混乱；

DidMount 和 DidUpdate 中获取数据
DidMount 绑定事件，WillUnMount 解绑事件；
使用 Hooks，相同逻辑可分割到一个一个的 useEffect 中；

### React Hooks 模拟组件生命周期
模拟 componentDidMount - useEffect 依赖 [];
模拟 componentDidUpdate - useEffect 无依赖，或者依赖 [a, b];
模拟 componentWillUnMount - useEffect 中返回一个函数；

useEffect 中返回函数 fn
    useEffect 依赖 []，组件销毁执行 fn，等于 WillUnMount；
    useEffect 无依赖或者依赖 [a, b]，组件更新时执行 fn；
    即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载；

### React Hooks 性能优化
useMemo 缓存数据；
useCallback 缓存函数；

