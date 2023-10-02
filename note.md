## 创建表

### 引入 typeorm 等包

### 创建三个实体类

#### User

字段：id username password createTime updateTime

使用 manyToMany， 和 Role 表建立联系

### Role

字段：id name createTime updateTime

使用 manyToMany 和 Permission 建立联系

### Permission

字段： id, name, desc, createTime, updateTime

## 新增数据

需要注入 EntityManager， 新增一些测试数据。

## 登录接口

需要写一个 userLoginDTO， 做一些简单的校验规则就行，在 main.ts 中全局引入 validatepPip

写一个登录接口， 先使用用户名判断在数据库中是否存在，再判断密码是否正确，返回对应的错误提示

登录之后， 把用户信息存到 jwt 中（需要导入 jwt， 注入 jwtSerivce）， 返回 token。

## 写一个守卫使请求头里携带 token

获取 request，先判断有无 token， 没有的话直接报错，， 一般的 token 会在 token 之前加上 Beare, 使用 split 方法把 token 取出来， 使用 jwtService.varift 方法，解密出 user 信息，没有就报错，把他挂在 request 上， 此时 ts 会报错， 使用 declare module 'express'把 user 挂上去。

而我们的登录接口是不需要权限验证的， 需要写一个装饰器来判断哪些接口或者 control 需要 token。

使用 SetMetaData 来判断。

在这个守卫里，使用 Reflector 获取 controller 的信息， 如果没有的话就放行

## 判断角色

写一个 permission 守卫。

我们前面已经把用户信息，包括用户的角色放在了 request 中。因为我们要用到 userService，在 user 模块中把 userService 导出来， 在 useService 写一个方法通过 roleId， 把用户的权限查出来。

需要在装饰器中，把需要的权限也放在 setMateData 中。

在需要权限的 controller 上加上所需要的权限，在守卫中，把权限查出来，和用户所拥有的权限做比较，不存在就抛异常
