### 初始化项目
https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create
### 适配移动端

### Vue组件渲染和更新过程
Render Function => vdom 渲染 dom 结构 => touch Data (getter, setter) => collect as Dependency => Wathcher
=> 组件更新 修改data 触发 setter => notify Watcher => re-render 重新渲染
