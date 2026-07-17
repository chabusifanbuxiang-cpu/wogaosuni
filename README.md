# 易优 CMS AI 导航模板开源包
![Uploading image.png…]()

这是一个面向全新易优 CMS 安装的导航站模板覆盖包，包含 PC/移动模板、公开网址工具数据、去元数据缩略图、脱敏导入器和 AI 安装说明。

**在线演示：** [https://wogaosuni.cn/](https://wogaosuni.cn/) · **安装教程：** [docs/INSTALLATION.md](docs/INSTALLATION.md) · **AI 安装提示词：** [docs/AI_INSTALL_PROMPT.md](docs/AI_INSTALL_PROMPT.md)

演示站用于查看当前模板在桌面端和移动端的实际效果。安装时必须把站点名称、域名、SEO 和联系方式改成自己的配置，不要照搬演示站的后台配置。

> [!WARNING]
> **网址数据风险声明**
>
> 本仓库中的网址、名称、分类和简介等数据均由 AI 整理，不保证数据的准确性、时效性、可用性或安全性。导入或上线前，请使用者自行进行多轮复核，重点确认域名归属、实际跳转目标、HTTPS 状态、内容合规性以及是否存在恶意页面。访问和使用第三方网站所产生的风险由使用者自行判断和承担。
>
> 如果发现错误、失效链接、错误分类或安全风险，欢迎及时通过 [GitHub Issues](https://github.com/chabusifanbuxiang-cpu/wogaosuni/issues) 反馈，帮助持续修正数据。

> 发布状态提醒：许可证禁止用于开源项目的 Fancybox 6.1.14 已移除，详情图片改用 MIT 许可的 PhotoSwipe 5.4.4。但第三方字体、主题来源、网站 Logo/图片和较长内容描述的再分发权仍需发布者人工确认。授权未确认前，建议只推送到 GitHub 私有仓库，不要直接设为 Public，也不要把整个仓库笼统宣称为全部 MIT。详见 [LICENSE_SCOPE.md](LICENSE_SCOPE.md)。

本包经过本地空库导入演练：69 个栏目、3,229 条网址工具、3,229 条详情内容、297 条多分类关系、16,527 条标签关系可以完整导入。数据包不包含数据库连接、管理员/用户数据、Session、支付/短信/邮件配置、API 密钥、日志或源站系统配置。

## 最快使用方式

1. 准备一个合法取得、全新安装且能正常登录后台的易优 CMS。
2. 完整备份目标站文件和数据库。
3. 把本目录交给 AI，并将 [AI_INSTALL_PROMPT.md](docs/AI_INSTALL_PROMPT.md) 的内容作为任务提示。
4. 先运行导入器的 dry-run，确认没有栏目 ID 或文档 ID 冲突。
5. 复制模板覆盖层、正式导入数据、清理易优缓存。
6. 在后台检查栏目模板、URL 模式、置顶和排行效果。

人工安装请阅读 [INSTALLATION.md](docs/INSTALLATION.md)，数据说明请阅读 [DATA_IMPORT.md](docs/DATA_IMPORT.md)。

## 目录说明

```text
开源/
├── template/                       # 复制到目标易优 CMS 根目录
├── data/
│   ├── navigation-content.v1.json  # 脱敏后的公开网址数据
│   └── media/                      # 只包含数据实际引用的图片
├── scripts/
│   ├── import_clean_content.php    # 默认只预检的导入器
│   └── export_clean_content.php    # 维护者重新生成数据时使用
├── docs/                           # 安装、后台设置和 AI 提示词
├── SECURITY.md
└── LICENSE
```

模板详情页已内置 PhotoSwipe 5.4.4 图片画廊；其 MIT 许可证位于 `template/pc/skin/Lib/photoswipe/LICENSE`，公开发布时必须一并保留。

## 环境基线

- 易优 CMS：建议使用与模板语法兼容的当前稳定版。
- PHP：本包在 PHP 7.4 下完成语法和导入测试。
- MySQL：本包在 MySQL 5.7 下完成真实空库导入测试。
- PHP 扩展：PDO MySQL、mbstring。
- 安装对象：全新或专门用于导入的站点，不建议直接导入已有内容站。

## 重要限制

- 模板存在少量直接数据库读取，用于排行、多分类和场景排序；导入器会补齐所需的 7 个产品扩展字段及多分类关系表。
- 本包保留原始栏目/文档编号以兼容模板里的现有链接。目标站发生 ID 冲突时，导入器会停止，不会静默覆盖。
- 新装易优 CMS 默认后台能维护“头条、置顶、推荐、点击量”；“全站/首页/分类置顶”和场景排序值需要按后台增强指南接入，或由 AI 针对目标版本实现。
- 商务合作与提交工具只导出栏目定义，不导出源站联系内容。
- 图片中的 EXIF/文本元数据已清理，但网站 Logo 和产品名称可能属于各自权利人，只能用于导航、识别和说明用途。

## 发布前再检查

只在本“开源”目录初始化 Git，不要在它的父目录初始化。暂存前后都运行：

```powershell
php scripts/audit_release.php
powershell -ExecutionPolicy Bypass -File scripts/pre_publish_check.ps1
git diff --cached --name-only
git diff --cached
gitleaks protect --staged --redact
```

第一次发布可把 [AI_GIT_PUBLISH_PROMPT.md](docs/AI_GIT_PUBLISH_PROMPT.md) 交给 AI；它要求 AI 在提交和推送前分别等待人工确认，并禁止误传父目录。

不要把目标站的 `application/database.php`、`.env`、数据库备份、Session、日志、缓存或整个 `uploads` 目录加入此包。

## 进一步阅读

- [后台热门、排行、推荐和置顶设置](docs/BACKEND_RANKING_GUIDE.md)
- [数据导入与字段映射](docs/DATA_IMPORT.md)
- [模板二次开发指南](docs/DEVELOPMENT.md)
- [兼容性和功能降级](docs/COMPATIBILITY.md)
- [安全与隐私边界](SECURITY.md)
- [第三方与授权说明](THIRD_PARTY_NOTICES.md)
- [许可证适用范围与公开阻塞项](LICENSE_SCOPE.md)
- [首次 Git 发布 AI 提示词](docs/AI_GIT_PUBLISH_PROMPT.md)
- [已知数据质量提醒](docs/DATA_QUALITY.md)
- [本次发布验收记录](docs/RELEASE_CHECKLIST.md)
