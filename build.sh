#! /bin/bash

#git pull

# 配置Hozon-UED分支
git config -f .gitmodules submodule.Hozon-UED.branch main
# 更新Hozon-UED
git submodule update --remote

token-transformer Hozon-UED/tokens.json token_out.json

#mv Hozon-UED/tokens.json Hozon-UED/tokens.json.bak

npm run build
