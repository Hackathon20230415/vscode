# 码小白 CoFinder => Code + Finder,  AI帮你查代码、写代码、写注释、做美化... 右键直达
![](https://postimg.aliavv.com/mbp162023/ore58k.jpg)

## 现已发布至 VSCode 市场，欢迎[**下载体验**](http://marketplace.visualstudio.com/items?itemName=best…)

## 愿景

- AIGC 来临之后，所有人都觉得 Somebody 将会失去自己的工作。但我们不同，我们相信 AIGC 终将改变世界，**但不是干掉每个人的工作，而是让每个人成为更好的自己。我们希望帮助每一个 Developer 都成为 10x Developer，甚至是 100x Developer。**
- For Developers, by Developers

## 取名灵感

- 英文名：Code（代码） + Finder（探测） = CoFinder。
- 中文名：Coding是一个持续成长的过程，每个阶段都把自己当做`小白`。`码小白`作为你的AI代码助手，助你完成更精湛、更出色的代码。

## Features
### VSCode Native  Code Features

作为一个希望帮助你变得更好的工具，我们不直接提供写代码的能力，但我们会成为你的 Trainer，帮助你来写出更好的代码。



| 初级                    | 中级                                 | 高级                                   | 其他                     |
| ----------------------- | ------------------------------------ | -------------------------------------- | ------------------------ |
| `初级` Review: 代码审查 | `初级` Review: 代码审查              | `高级` Refactor: 代码重构              | `其他` Inspire: 激发灵感 |
|                         | `中级` Comment: 为代码添加注释       | `高级` Rewrite: 代码重写               |                          |
|                         | `中级` Simplify: 简化一段代码        | `高级` Module: 使代码更加模块化        |                          |
|                         | `中级` Clean: 清理代码中不需要的内容 | `高级` Upgrade: 使用最新的版本重写代码 |                          |

我们选择了开发者最熟悉的右键菜单的方式，自动识别需要对选中内容做识别 or 使用快捷键进行识别。

| 右键模式（整个文件）                                         |                 右键模式（选中代码）                 |                      快捷键模式                      |
| ------------------------------------------------------------ | :--------------------------------------------------: | :--------------------------------------------------: |
| ![](https://postimg.aliavv.com/mbp162023/99hxej.png)| ![](https://postimg.aliavv.com/mbp162023/t53jv4.png) | ![](https://postimg.aliavv.com/mbp162023/0vo0y3.png) |



### Personal Use Features
#### 本地模式
- 码小白的用户和普通的 AIGC 产品的用户有一个很大的不一样，是我们的用户都是工程师，工程师们都是拥有自己的 OpenAI 的账户的，也坚信自己写的 Prompt 比我们 Fintune 后的模型更好的。所以，我们给码小白提供了本地模式，可以直接从开发者电脑直接向 OpenAI 发起请求。

![本地模式截图](https://postimg.aliavv.com/mbp162023/ygy3va.png)

#### 自定义 Prompt（期货）

- 除了内置的 Prompt ，大家肯定还有自己想要使用在编程场景下的 Prompt ，我们提供了 VSCode Native 的自定义 Prompt 的功能。

| 使用自定义 Prompt                                    |
| ---------------------------------------------------- |
| ![](https://postimg.aliavv.com/mbp162023/lw7t27.gif) |

#### GPT4 compatible

- 码小白本地模式支持使用 GPT-4 模型来进行自动补全，可以帮助开发者体验更强的模型。

![](https://postimg.aliavv.com/mbp162023/i5eelv.png)

## 技术方案

**SaaS 方案**

	1. 在 VSCode 根据用户行为判别用户意图。
	1. 发送至 CoFinder 服务端，使用 FineTune 后的模型进行推理。
	1. 结果返回到本地，并根据行为类型，选择使用 Diff 模式还是插入模式。

**本地方案**：

 	1. 在 VSCode 根据用户行为判别用户意图。
 	2. 在本地使用用户自定义的 Prompt 来完成 Prompt 的组装
 	3. 发送至 OpenAI 进行推理，并在拿到结果后根据行为类型，选择使用 Diff 模式还是插入模式。

**Self-Hosed 方案**

- 目前服务端使用的是基于 Next.js 的 Serverless Function 的方案，并提供了基于 Docker 的实现方式。

**自定义 Prompt 方案**

- 使用 [hexojs/warehouse](https://github.com/hexojs/warehouse) 作为数据库，满足 Prompt 存储时的结构化数据存储。
- 使用 [https://code.visualstudio.com/api/references/vscode-api#Memento](https://code.visualstudio.com/api/references/vscode-api#Memento) 作为数据存储源，来持久化存储用户存储的 Prompt 。
- 使用 `setKeysForSync` 来完成跨机器的用户 Prompt 的存储。

![](https://postimg.aliavv.com/mbp162023/f7ral9.png)

## 长期规划（期货）

### 多编辑器系统支持

- CoFinder 后续将支持 Jetbrains 系列 IDE、XCode、Sublime Text 等常见编辑器系统，给开发者带来全平台统一的体验。

![](https://postimg.aliavv.com/mbp162023/lcsi66.png)
### 多 LLMs 适配
- CoFinder 后续将提供基于 *LLaMA* 、*ChatGLM* 的对接能力，以满足开发者对敏感代码保护的诉求。

### 独立应用

- CoFinder 后续将提供独立应用，用于更好的展示推理过程，帮助开发者理解 AI 视角下的模型能力，从机器的视角来看待我们的代码。
- 同时，独立应用可以更方便地进行多次互动、提前预览、编辑修改等操作，以及在本地运行 *LLaMA* 、*ChatGLM* 等模型，来满足企业和个人对于敏感代码保护的需求。

![](https://postimg.aliavv.com/mbp162023/6futnb.png)

## 作者
- [白宦成](https://github.com/bestony)
- [陈大好Davis](https://github.com/bjdehang)

## LICENSE

[Apache Licesne V2](LICENSE)
