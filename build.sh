#! /bin/bash

jsonFolder="/Hozon-UED/"
jsonFile="/Hozon-UED/tokens.json"

if [ ! -d  " $jsonFolder " ] ; then 
 git clone https://github.com/daisyshi1030/Hozon-UED.git
fi

.$jsonFolder/git pull

chmod 755 $jsonFolder

 
token-transformer /Hozon-UED/tokens.json /Hozon-UED/token_out.json

mv /Hozon-UED/token.json /Hozon-UED/token.json.bak

npm run build
