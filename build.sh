#! /bin/bash

#git pull

# 初始化本地配置文件
git submodule init
 
# 检出父仓库列出的commit
git submodule update

#sudo chmod 755 Hozon-UED/
#sudo chmod 755 Hozon-UED/tokens.json
 
token-transformer Hozon-UED/tokens.json token_out.json

#mv Hozon-UED/tokens.json Hozon-UED/tokens.json.bak

npm run build
