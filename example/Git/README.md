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
更新子模块
```bash
git submodule update --init --recursive
```
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