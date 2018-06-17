### 新建本地分支
### 处理合并冲突
```bash
git merge dev
```
### 回滚
```bash
git revert < commit id >
```
### 再次回滚
```bash
git revert --mainline 1 < commit id >
```
### 重置
git rebase -i < commit id >
修改文件内容
切换到master
merge
### 子模块
#### 更新子模块
```bash
git submodule update --init --recursive
git submodule foreach git pull
```
#### 更新新提交
```bash
Subproject commit
```
#### 克隆子模块
```bash
git submodule add git@git.dxl.cc:node/dxlModule.git dxlModule
```
#### 切换分支
到子目录下进行切换
### gitHub tag
列出标签
```bash
git tag
```
打标签
```bash
git tag -a v1.0 -m 'version'
```
推送标签
```bash
git push origin master --tags 
```
删除本地标签
```bash
git tag -d v1.0.0
```
删除远程tag
```bash 
git push origin :refs/tags/v1.0.0
```

### 配置
```bash
git config --list
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

### pull request
客户端操作