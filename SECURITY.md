# 安全与隐私

## 本包的安全边界

本包只应包含模板覆盖文件、公开网址数据、公开内容图片、文档和不内置凭据的 CLI 工具。

禁止加入：

- `application/database.php`、`.env` 和服务器面板配置；
- API Key、AppSecret、Access Token、私钥、证书私钥；
- 完整数据库或 SQL 备份；
- Session、Cookie、验证码、登录日志；
- 管理员、用户、订单、支付、短信、邮件和微信配置；
- 本地绝对路径、服务器 IP、SSH 配置；
- 未公开商务联系人和二维码。

## 导入器行为

- 默认 dry-run；
- 正式写入需要双重参数确认；
- 只操作栏目、公开内容、产品内容、标签和多分类关系；
- 不查询或写入管理员、用户、系统配置、支付和 Session 表；
- ID 冲突立即停止；
- 数据写入使用事务，但 DDL 和媒体复制仍要求事先备份。

## Git 提交前检查

```powershell
git status --short
git diff --cached --name-only
git diff --cached
gitleaks protect --staged --redact
```

额外检查危险文件：

```powershell
git ls-files | rg "database\.php|\.env|session|\.sql|\.key|\.pem|\.pfx|\.p12|backup|\.log"
```

`.gitignore` 不能清除已经提交的历史。发现敏感文件已经提交时，应先撤销/轮换凭据，再清理 Git 历史。

## 如果发现泄露

1. 立即撤销或轮换相应密钥/密码；
2. 暂停公开仓库或发布流程；
3. 检查分支、标签、Release、Actions 日志和镜像；
4. 使用历史清理工具删除敏感对象；
5. 重新扫描整个历史，而不只是当前文件；
6. 已经公开的密钥永久视为泄露，不能因为删掉文件就继续使用。

## 报告问题

公开报告只描述文件路径、字段类型和影响，不要在 Issue 中粘贴真实密钥、数据库内容或个人信息。需要证明时使用脱敏截图或哈希。
