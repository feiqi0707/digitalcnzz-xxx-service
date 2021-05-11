# digitalzz-xxx-service

基于 node+koa2+limit 等的服务端项目

# 安装依赖环境

yarn 、npm install

# 启动开发服务

yarn dev 、 npm run dev

# 构建生产测试发布包

yarn build 、yarn build:test 、 npm run build:prod 、 npm run build:test

# 查看端口使用情况

lsof -i:8089 && kill -9 pid
netstat - atulnp | grep 8089
