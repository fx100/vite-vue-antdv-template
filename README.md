# vite-vue-antdv-template

一个 vue3 + ant-design-vue3 项目模板

- 对 a-modal 二次封装支持拖拽移动，同时保留 a-modal 的全部特性

[不带 ant-design-vue 版本点此](https://github.com/fx100/vite-vue-template)

## 主要依赖

- vite `2.7.2`
- vue `3.2.25`
- typescript
- eslint
- prettier
- ant-design-vue `3.x.x`

## 准备

Windows系统下将编辑器 `行尾(eol)` 设置为 `LF('\n')`

vscode配置:
```json
{
    "files.eol": "\n"
}
```

Windows系统下将Git配置项将 `core.autocrlf` 设为 `input`

```bash
git config core.autocrlf input # 推荐
git config --global core.autocrlf input
```

## 安装

```bash
git clone git@github.com:fx100/vite-vue-template.git

cd vite-vue-template

pnpm install

pnpm dev
```
