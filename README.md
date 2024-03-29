# single-log-Birdge
JS模拟演示操作系统的 “独木桥问题”，扩展包括桥对岸的人可以申请过桥。

### 一、描述

本程序使用 JavaScript，模拟操作系统的“独木桥问题”，生成随机方向的过桥zombies，假设他们的到达时间一致，进行调度。

#### 问题描述

有一座独木桥，同一时刻只允许一个方向串行通行，另一个方向有过桥的人（僵尸），需要等待，直到桥上无人才可以过桥。

+ 增加桥对岸的人可以申请过桥需求，发出申请之后，过桥方不在上桥，申请方等待桥空出可以过桥。

### 二、使用说明

1. 运行环境
   推荐使用 Chrome、 EDGE、FireFox浏览器打开运行程序。

2. 运行

   1. 用浏览器打开index.html，两岸自动生成若干僵尸。
   2. 点击`Schedule`按钮进行调度。

3. 增加僵尸

   1. 点击`Zombies`可以生成若干僵尸。

4. 调度过桥僵尸

   1. 当桥两边有僵尸的时候，可以点击`schedule`按钮进行调度。
   2. 认为桥两边的僵尸到达时间一致，到达顺序按生成顺序排序，优先调度先生成的僵尸。

5. 对岸申请过桥

   1. 当桥两岸都有僵尸的时候，可以点击`Switch`为等待方申请过桥。
   2. 申请发出之后，桥对岸僵尸不允许上桥，待桥上无人时，申请方可以过桥。

   

### 三、运行

![running](./src/image/running.png)
