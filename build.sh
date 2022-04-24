#! /bin/bash

jsonFolder="/Hozon-UED/"

git pull

# 初始化本地配置文件
git submodule init
 
# 检出父仓库列出的commit
git submodule update

sudo chmod 755 $jsonFolder

 
token-transformer /Hozon-UED/tokens.json /Hozon-UED/token_out.json

mv /Hozon-UED/token.json /Hozon-UED/token.json.bak

npm run build
