# 模板开发指南

## 模板结构

| 路径 | 作用 |
|---|---|
| `template/pc/index.htm` | 首页主体与栏目分区 |
| `template/pc/header.htm` | 桌面导航、搜索与移动顶栏 |
| `template/pc/footer.htm` | 页脚和站长可配置的联系入口 |
| `template/pc/lists_product.htm` | 工具分类列表 |
| `template/pc/view_product.htm` | 工具详情 |
| `template/pc/lists_rank.htm` | 热点排行页 |
| `template/pc/nav_sort_helper.htm` | 工具场景排序与多分类辅助函数 |
| `template/pc/nav_card.htm` | 工具卡片 |
| `template/pc/search_panel.htm` | 搜索面板 |
| `template/pc/skin/wogaosuni/` | 本模板主要样式、脚本和图片 |
| `template/mobile/` | 易优独立移动模板兼容层 |

多数页面同时加载 PC 模板中的响应式样式，因此修改时必须在桌面和手机宽度都验证。

## 常用易优标签

### 按热度调用工具

```html
{eyou:artlist channelid='2' typeid='$eyou.field.typeid' orderby='click' loop='8'}
  <a href="{$field.arcurl}">{$field.title}</a>
  <span>{$field.click}</span>
{/eyou:artlist}
```

### 调用推荐工具

```html
{eyou:artlist channelid='2' flag='c' orderby='click' loop='8'}
  {$field.title}
{/eyou:artlist}
```

### 调用头条工具

```html
{eyou:artlist channelid='2' flag='h' orderby='click' loop='8'}
  {$field.title}
{/eyou:artlist}
```

### 当前内容浏览量

```html
{eyou:arcclick /}
```

列表循环中使用 `{$field.click}`，详情页使用 `{eyou:arcclick /}`。

## 模板排序开发

优先复用 `nav_sort_helper.htm` 中的函数：

- `wn_nav_priority_aids`：按场景置顶、排序值、平台等级和热度取 AID；
- `wn_nav_hot_aids`：按点击量取热门内容；
- `wn_nav_collect_type_ids`：递归收集栏目及子栏目；
- `wn_nav_tool_category_rel_table`：检测可选多分类关系表；
- `wn_nav_region_where_sql`：国内/国外筛选。

模板中的直接 SQL 必须：

- 使用 `config('database.prefix')` 获取表前缀；
- 把栏目 ID、AID、分页值转换为整数；
- 不拼接未经白名单处理的请求参数；
- 限制查询数量，避免首页全表扫描；
- 自定义表不存在时提供回退。

## 广告与联系信息

广告组件使用易优广告标签，发布包不包含原站广告图片或链接。请在新站后台创建对应广告位，或保持为空。

页脚 QQ、微信等入口读取目标站自己的全局字段。不要把真实号码、二维码、邮箱或密钥硬编码进模板，也不要写进示例数据。

## 修改流程

1. 只修改开源包副本或专门的开发分支；
2. 先读取相关 HTM、CSS 和 JS 的现有结构；
3. 每次只完成一个页面或组件；
4. 保持 UTF-8，避免用会改变编码的批量替换；
5. 清除易优缓存；
6. 测试桌面 1440px、平板 960px 附近和手机 390px；
7. 检查浏览器控制台、404 静态资源、空链接和 PHP 错误；
8. 提交前运行敏感信息扫描。

## 数据开发

数据格式定义在 `data/navigation-content.v1.json`。新增字段时必须同时更新：

- `export_clean_content.php`；
- `import_clean_content.php`；
- `DATA_IMPORT.md`；
- 格式版本号或向后兼容逻辑；
- 空库真实导入测试。

任何导出字段都应先回答：它是否是公开页面需要的数据？如果不是，就不要导出。

## 最低验收页面

- 首页；
- 一个顶级工具分类；
- 一个二级工具分类；
- 一个工具详情和官网跳转；
- 热点排行；
- 搜索结果；
- 标签页；
- 商务合作与提交工具空状态；
- 手机首页、列表、详情和搜索弹层。
