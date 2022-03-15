[toc]

# Unity Shader 曲面细分简介
## 概念介绍
曲面细分一种对输入的图元（三角形、四边形、线段）进行细化，产生出更多的顶点，使其变得更精细的技术。
这一功能在渲染管线中完成，通常会由显卡硬件支持。从阶段上讲它位于顶点着色器之后，像素着色器之前。
它的内部流程分为三部分：可编程的Hull Shader（控制细分参数），不可编程的Generator（细分顶点），可编程的Domain Shader（顶点位置计算）。
因此，它基于顶点着色器阶段后的顶点数据，并可以控制生成更多的顶点数据交由像素着色器使用。
## 作用
曲面细分技术降低了模型精细度要求，在模型制作、存储、加载上都可带来节省。
通过曲面细分生成更精细的顶点后，可以应用“置换贴图”技术来渲染出更加精细、逼真的模型。

置换贴图不同于法线贴图修改顶点的法线方向来造成光影错觉，它会真正修改顶点的位置来产生凹凸感，因此当视线与网格切面方向接近时法线贴图基本上失效而置换贴图仍可产生逼真的效果。
例如以下分别是【标准】材质、【未细分仅置换】材质、【固定数目细分置换】材质的效果：

![image](https://gitee.com/yangxun666/yangxun983323204.github.io/raw/master/showcase/articles/20220315/./contrast.png)  
## 关于Unity支持
unity文档里只提了Built-in Render Pipeline的Surface Shader支持曲面细分，并且只支持三角形。同时它需要Shader Model 4.6target，因此不支持更老的设备。
## 官方案例
在使用Surface Shader的前提下使用曲面细分非常简单，以下的每种细分方法都提供了内置的函数，直接调用就完事。
总的来说是在shader中增加两个函数：
```
tessellate:FunctionName
vertex:FunctionName
```

tessellate声明的函数返回细分控制参数，这是一个float4类型，前三个值分别表示输入三角形的三个边被分成几段，第四个值是Inside因子，算法使用，不太清楚。

vertex声明的函数可以拿到细分后的所有顶点，可以在这里修改其位置。

例图:
![image](https://gitee.com/yangxun666/yangxun983323204.github.io/raw/master/showcase/articles/20220315/./sample0.png)  

### 不细分，仅顶点置换
和上图不同之处在于，它只声明了vertex函数，未声明tessellate函数，因此它仅在vertex函数中采样了置换图然后修改顶点位置。
### 固定细分和顶点置换
例图中就是这个示例，它在tessellate函数中返回了一个固定的细分因子，因此它产生的细分数量是固定的。
### 基于距离的细分和顶点置换
它的效果就是当物体离相机近时细分增多，当离相机远时细分减少。
![image](https://gitee.com/yangxun666/yangxun983323204.github.io/raw/master/showcase/articles/20220315/./sample1.png)  
它的tessellate函数略有不同了，多了三个参数。这三个参数就是原三角形的三个顶点，里面又调用了UnityDistanceBasedTess方法，这个方法会计算每个顶点与相机的距离，最终生成细分因子。
### 基于边长的细分和顶点置换
上面的其于距离细分只能用于所有三角面都差不多大的情况，否则细分就不均匀。
因此，UnityEdgeLengthBasedTess基于边长生成细分因子，更大的三角形将细分成更多三角形。
![image](https://gitee.com/yangxun666/yangxun983323204.github.io/raw/master/showcase/articles/20220315/./sample2.png) 
Unity还提供了替代方法UnityEdgeLengthBasedTessCull，它会额外计算相机的可视范围裁剪，减少参与细分的三角形数量，当网格会有很多部分在视野外时，应使用这个方法。
### 冯氏曲面细分
这个的效果就是会让细分后的面向网格法线方向外移一点点，这会使得网格变得更加光滑，因此用于low-poly模型时效果不错。
![image](https://gitee.com/yangxun666/yangxun983323204.github.io/raw/master/showcase/articles/20220315/./sample3.png) 
这个更简单了，不需要提供vertex函数而是指定了一个tessphong的float值控制强度，Unity自动完成顶点修改。
## 更多
虽然文档化的只有Surface Shader，实际上也支持更灵活的顶点\像素shader，只是需要去看Surface Shader的生成代码总结规律。