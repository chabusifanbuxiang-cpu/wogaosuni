# 安装教程

> 效果参考：[在线演示站 https://wogaosuni.cn/](https://wogaosuni.cn/)。演示站只用于查看页面布局和交互效果，安装时请使用自己的站点名称、域名、SEO 与联系方式。

## 1. 准备目标站

只在合法取得、全新安装的易优 CMS 上执行。先完成易优官方安装，确认首页和后台正常，再备份：

- 目标数据库完整备份；
- `template/pc` 与 `template/mobile`；
- 目标站已有的 URL 重写配置；
- 如果已有内容，停止使用本教程，先解决栏目 ID 和文档 AID 的映射问题。

本包不会携带数据库配置。导入器只在运行时读取目标站自己的 `application/database.php`，不会把其内容写入 JSON 或日志。

## 2. 先执行只读预检

```powershell
& "PHP可执行文件" `
  "开源包绝对路径\scripts\import_clean_content.php" `
  --cms-root="目标CMS绝对路径"
```

预期输出类似：

```text
Mode=dry-run categories(insert=69,reuse=0) tools(insert=3229,reuse=0) media=3050 schema_additions=7
Dry run only.
```

以下结果必须停止处理：

- `Category ID conflict`：目标栏目编号已被其他栏目使用；
- `Archive ID conflict`：目标文档编号已被其他内容使用；
- 缺少基础表：目标易优 CMS 未正确安装或版本结构不兼容；
- 缺少媒体文件：开源包不完整。

## 3. 复制模板覆盖层

将开源包里的 `template` 合并复制到目标 CMS 根目录下的 `template`。只覆盖同名文件，不删除目标目录的其他文件。

PowerShell 示例：

```powershell
$package = "开源包绝对路径"
$cms = "目标CMS绝对路径"
Copy-Item -Recurse -Force "$package\template\*" "$cms\template\"
```

不要复制本项目原始的 `application`、`core`、`data`、`uploads` 或 `.git`。

## 4. 正式导入公开数据

确认数据库备份可恢复后执行：

```powershell
& "PHP可执行文件" `
  "开源包绝对路径\scripts\import_clean_content.php" `
  --cms-root="目标CMS绝对路径" `
  --apply `
  --confirm=IMPORT_PUBLIC_DATA
```

导入器会：

1. 为产品内容表补充 7 个排行/场景字段；
2. 如不存在则创建多分类关系表；
3. 按原编号导入 69 个栏目定义；
4. 导入 3,229 条已发布网址工具及详情内容；
5. 导入标签和多分类关系；
6. 把脱敏图片复制到 `uploads/open-source-nav`；
7. 不读取或写入管理员、用户、支付、系统配置和 Session 表。

## 5. 后台模板设置

进入“栏目管理”，重点检查：

| 栏目用途 | 列表模板 | 内容模板 |
|---|---|---|
| AI 工具分类 | `lists_product.htm` | `view_product.htm` |
| 热点排行 | `lists_rank.htm` | 不需要详情模板 |
| 文章资讯 | `lists_article.htm` | `view_article.htm` |
| AI 下载 | `lists_download.htm` | `view_download.htm` |
| 商务合作 | `lists_single.htm` | `view_article.htm` 或目标版本单页模板 |
| 提交工具 | `lists_guestbook.htm` | 不需要 |

数据导入会恢复源栏目模板名称，但不同易优版本可能自动增加目录前缀。后台最终显示的模板必须能在 `template/pc` 下找到。

## 6. URL 与排行页

- 在易优后台把 `web_basehost` 设置为包含 `http://` 或 `https://` 的完整站点根地址，例如 `https://example.com`。不要填写子路径、查询参数、账号密码，也不要让 AI 用请求 `Host` 头作为 canonical/schema 的兜底。
- “热点排行”栏目目录为 `ranking`，模板内默认链接 `/ranking/`。
- 若 `/ranking/` 返回 404，先检查栏目目录、伪静态模式和 Web 服务器重写规则。
- 不建议为了一个路由整文件覆盖目标站 `application/route.php`；让 AI 根据目标易优版本新增最小路由或使用栏目默认 URL。
- “提交工具”和“商务合作”只带栏目定义，具体表单/联系方式应由新站站长自行配置。

## 7. 清缓存与验收

优先使用易优后台的“清除缓存/更新缓存”。随后检查：

- 首页；
- 顶级分类与二级分类；
- 工具详情与官网跳转；
- 文章、工具和下载详情正文图片的 PhotoSwipe 弹层、关闭、切换、缩放和移动端手势；
- `/ranking/`；
- 搜索和标签页；
- 手机宽度下的首页、列表和详情；
- 浏览器控制台没有 404 静态资源和 JavaScript 错误。

热门、排行和置顶的后台设置见 [BACKEND_RANKING_GUIDE.md](BACKEND_RANKING_GUIDE.md)。
