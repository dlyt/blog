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