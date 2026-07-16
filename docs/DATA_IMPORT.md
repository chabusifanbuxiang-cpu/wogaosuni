# 公开网址数据与导入说明

> [!WARNING]
> 本数据包中的网址及相关描述均由 AI 整理，不保证准确性和安全性。正式导入前请自行进行多轮复核，不要因为数据能通过导入器检查就直接对外发布。发现错误、失效链接或安全风险时，请通过 [GitHub Issues](https://github.com/chabusifanbuxiang-cpu/wogaosuni/issues) 及时反馈。

## 数据范围

当前整理好的公开内容实际存放在易优 CMS 产品频道（`channel=2`），不是普通文章频道。导出内容为：

- 69 个栏目定义，其中包含工具、文章、下载、排行、商务合作和提交工具栏目；
- 3,229 条已发布、未删除、可访问的网址工具；
- 3,229 条产品详情内容；
- 297 条额外分类关系；
- 16,527 条工具标签关系；
- 3,050 个被数据实际引用并按当前内容 SHA-256 去重的图片。

普通文章频道当前没有符合“已发布、未删除”条件的文章，因此没有伪造文章数据。商务合作和提交工具只导出栏目，不导出源站联系内容。

## JSON 格式

`data/navigation-content.v1.json` 的顶层结构：

```json
{
  "format": "eyoucms-navigation-content",
  "format_version": 1,
  "privacy": [],
  "counts": {},
  "categories": [],
  "tools": []
}
```

工具记录包含：

- 原栏目/文档编号，用于全新站兼容模板；
- 标题、副标题、摘要、详情 HTML；
- 官网公开 URL；
- 缩略图的包内相对引用；
- 点击量、推荐/头条/传统置顶；
- 全站/首页/分类置顶和场景排序；
- 国内/国外、平台等级；
- SEO 公开文本、标签和多分类关系。

明确不包含：

- 数据库主机、库名、用户名、密码和表前缀；
- 后台管理员和前台用户 ID；
- Session、Cookie、Token、支付、短信、邮件、微信配置；
- 系统配置表、日志、缓存、备份；
- 源站绝对路径；
- 商务合作页中的联系人信息。

邮件、手机号、常见 Token 格式、私钥块和 Windows 本地路径在导出时会被移除。源站绝对链接会尽量转成相对链接；官网外链会移除常见跟踪、邀请和令牌参数。

## 导入器安全机制

`scripts/import_clean_content.php` 默认是 dry-run：

```powershell
php scripts/import_clean_content.php --cms-root="目标CMS路径"
```

只有同时提供下面两个参数才会写入：

```text
--apply --confirm=IMPORT_PUBLIC_DATA
```

导入前会检查：

- 基础表是否存在；
- 栏目 ID 是否被不同栏目占用；
- 栏目 ID 已存在时，slug、父栏目和频道类型是否完全一致；
- 文档 AID 已存在时，标题、频道、主分类、对应产品正文记录，以及忽略查询参数后的官网 host/path 是否完全一致；
- 每个网址是否是 HTTP/HTTPS；
- 每个网址是否避开私网/本机地址、凭据和追踪/令牌参数；
- 正文是否含脚本、iframe、事件属性、危险协议、PHP 或易优模板标签；
- 所有 JSON 引用的图片是否存在；
- 目标媒体目录若已有同名文件，其内容是否与包内文件一致；
- 自定义排序字段和多分类关系表是否需要创建。

ID 冲突会直接停止。这是有意设计，避免在已有站点中覆盖内容。

## 字段映射

| JSON | 易优 CMS |
|---|---|
| `category_legacy_id` | `archives.typeid` |
| `official_url` | `archives.jumplinks` |
| `thumbnail` | `archives.litpic`，导入后位于 `/uploads/open-source-nav/` |
| `flags.headline` | `archives.is_head` |
| `flags.recommended` | `archives.is_recom` |
| `flags.top` | `archives.is_top` |
| `ranking.clicks` | `archives.click` |
| `ranking.base_sort_order` | `archives.sort_order` |
| `content_html` | `product_content.content` |
| `ranking.global_top` | `product_content.top_global` |
| `ranking.home_top` | `product_content.top_home` |
| `ranking.category_top` | `product_content.top_category` |
| `ranking.platform_tier` | `product_content.platform_tier` |
| `category_relations` | `wogs_tool_category_rel` |

导入器给所有内容使用 `admin_id=0`、`users_id=0`，作者固定为“开源数据”，不会复制源站管理员身份。

## 失败与恢复

- 栏目、工具、标签和关系数据使用数据库事务；发生异常时会回滚。
- 添加字段、创建关系表属于 MySQL DDL，不能依赖事务回滚。
- 媒体复制也不属于数据库事务。
- 因此正式导入前必须备份数据库；失败后按备份恢复，并检查 `uploads/open-source-nav`。

## 维护者重新生成数据

`export_clean_content.php` 不含任何连接值，它读取维护者本地 CMS 自己的配置：

```powershell
php scripts/export_clean_content.php --source-root="本地CMS根目录" --imagemagick="ImageMagick的magick.exe绝对路径"
```

导出器要求显式提供 ImageMagick 可执行文件，会对图片执行自动方向纠正和元数据清除，再按处理后的真实 SHA-256 命名；未被本次数据引用的旧生成图片会从 `data/media` 清理。重新生成后仍必须运行发布审计、检查 JSON 数量并更新校验清单。不要在 Git 中加入源站的 `application/database.php`。

已知同名、同官网和 HTTP 链接不由导入器擅自合并或改写，人工复核清单见 [DATA_QUALITY.md](DATA_QUALITY.md)。
