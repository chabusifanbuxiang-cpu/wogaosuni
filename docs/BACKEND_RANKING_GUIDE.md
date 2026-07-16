# 后台热门、排行、推荐和置顶设置

## 一、先认识两组字段

### 易优 CMS 标准内容字段

| 后台含义 | 数据字段 | 本站用途 |
|---|---|---|
| 头条 | `archives.is_head` | 头条筛选、部分推荐排序 |
| 推荐 | `archives.is_recom` | 推荐工具榜、推荐内容 |
| 有图 | `archives.is_litpic` | 判断缩略图状态 |
| 外链 | `archives.is_jump` | 工具官网跳转 |
| 点击量/浏览量 | `archives.click` | 热门榜与热点排行 |
| 基础排序 | `archives.sort_order` | 同级内容的基础人工排序，数值小优先 |
| 传统置顶 | `archives.is_top` | 兼容排序字段，部分易优版本后台不直接显示 |

当前易优标记映射为：`h → is_head`、`c → is_recom`、`p → is_litpic`、`j → is_jump`。

### 本模板扩展字段

这些字段位于产品内容表，导入器会自动创建：

| 字段 | 含义 | 建议默认值 |
|---|---|---|
| `top_global` | 全站场景置顶 | `0` |
| `top_home` | 仅首页置顶 | `0` |
| `top_category` | 仅分类页置顶 | `0` |
| `platform_tier` | 平台优先级分组 | `普通` |
| `home_sort_order` | 首页人工顺序，越小越靠前 | `100` |
| `category_sort_order` | 分类页人工顺序，越小越靠前 | `100` |
| `site_region` | 国内/国外筛选 | `国内` |

## 二、后台日常操作

### 设置热门

热门不是一个开关，而是按 `click` 降序计算。进入内容管理的产品/工具列表，编辑工具的点击量；点击量越高，以下调用越靠前：

```html
{eyou:artlist channelid='2' orderby='click' titlelen='28' loop='8'}
  <a href="{$field.arcurl}">{$field.title}</a>
  <span>{$field.click} 浏览</span>
{/eyou:artlist}
```

不要用虚假超大点击量长期置顶。需要人工置顶时使用推荐或场景置顶字段。

### 设置推荐榜

在产品编辑页勾选“推荐”，对应 `is_recom=1`。标准调用：

```html
{eyou:artlist channelid='2' flag='c' orderby='click' titlelen='28' loop='10'}
  <a href="{$field.arcurl}">{$field.title}</a>
{/eyou:artlist}
```

模板排行页的“推荐工具榜”只选推荐记录，再按热度排序。

### 设置头条

勾选“头条”，对应 `is_head=1`。标准调用：

```html
{eyou:artlist channelid='2' flag='h' orderby='click' loop='8'}
  {$field.title}
{/eyou:artlist}
```

### 设置普通置顶

如果目标易优版本后台有“置顶”开关，启用后对应 `is_top=1`。如果后台没有该开关，不要修改数据库配置；让 AI 按“后台增强”章节添加字段控件，或使用随包管理脚本。

## 三、本模板的实际排序优先级

首页/分类页不是简单按点击量排列。主要顺序如下：

1. `platform_tier`：国内大厂、国内普通、普通国内、国外大厂、国外成熟、国外普通/低优先；
2. 当前场景置顶：全站置顶加首页置顶，或全站置顶加分类置顶；
3. 当前场景排序值：`home_sort_order` 或 `category_sort_order`，数值越小越靠前；
4. `archives.sort_order`，数值越小越靠前；
5. `archives.click`，数值越大越靠前；
6. `archives.aid`，较新的记录用于最后稳定排序。

因此常见设置建议是：

| 目标 | 设置方法 |
|---|---|
| 首页第一个 | `top_home=1`，`home_sort_order=1` |
| 某分类第一个 | `top_category=1`，`category_sort_order=1` |
| 所有主要场景靠前 | `top_global=1`，两个排序值设置为较小值 |
| 仅进入推荐榜 | `is_recom=1`，不必设置场景置顶 |
| 自然热门 | 不置顶，只提高真实 `click` |
| 降低展示优先级 | `platform_tier=低优先`，排序值设置为 `9999` |

同一场景不要给大量记录都设置为 `1`，否则会退回基础排序和点击量决定顺序。

## 四、排行页调用逻辑

- 热门工具：主要按 `click DESC`；
- 推荐工具榜：`is_recom=1` 后按热度；
- 新收录：按发布时间/文档编号倒序；
- 分类榜：限制分类或多分类关系后，再使用场景优先级和热度；
- 多分类：可选表 `wogs_tool_category_rel` 存在时启用，不存在时自动退化到主分类 `typeid`。

排行模板是 `template/pc/lists_rank.htm`，通用排序辅助是 `template/pc/nav_sort_helper.htm`。

## 五、给 AI 的后台增强要求

全新易优 CMS 默认不会显示本模板的 7 个扩展字段。让 AI 针对目标版本实现时，应遵循：

1. 先检查产品新增、编辑、列表控制器和模板，不整文件覆盖其他版本源码；
2. 产品新增/编辑表单使用 `addonFieldExt[top_global]`、`top_home`、`top_category`、`platform_tier`、`home_sort_order`、`category_sort_order`、`site_region`；
3. 保存时布尔字段只接受 `0/1`，排序字段转为非负整数，平台等级使用固定白名单；
4. 产品列表查询左连接产品内容表，显示场景置顶状态和两个排序值；
5. 快速修改接口必须校验管理员权限、字段白名单和 CSRF，不允许客户端传任意表名/字段名；
6. 不修改 `application/database.php`，不把数据库值写进源码；
7. 修改后验证新增、编辑、列表快速修改、缓存清理和前台排序。

如果暂时不做后台增强，可以使用 `scripts/set_tool_ranking.php` 按 AID 安全设置扩展字段；该脚本默认只预览，不写入。

预览示例：

```powershell
php scripts/set_tool_ranking.php --cms-root="目标CMS路径" --aid=123 --home-top=1 --home-sort=1
```

确认预览正确后正式保存：

```powershell
php scripts/set_tool_ranking.php --cms-root="目标CMS路径" --aid=123 --home-top=1 --home-sort=1 --apply --confirm=UPDATE_TOOL_RANKING
```

可用参数包括 `--global-top`、`--home-top`、`--category-top`、`--home-sort`、`--category-sort`、`--tier`、`--region`、`--recommended`、`--headline`、`--top` 和 `--click`。
