#!/bin/sh

docker rmi registry.cn-hangzhou.aliyuncs.com/bullyun/superset:2.0.11.3 -f
docker tag bullyun/superset:2.0.11.3 registry.cn-hangzhou.aliyuncs.com/bullyun/superset:2.0.11.3
docker push registry.cn-hangzhou.aliyuncs.com/bullyun/superset:2.0.11.3
