#!/bin/bash
# Download latest node and install.
bwklink=`curl -s https://api.github.com/repos/allmn-crypto/allmn/releases/latest | grep browser_download_url | grep linux64 | cut -d '"' -f 4`
mkdir -p /tmp/allmn
cd /tmp/allmn
curl -Lo allmn.tar.gz $bwklink
tar -xzf allmn.tar.gz
sudo mv ./bin/* /usr/local/bin
cd
rm -rf /tmp/allmn
mkdir ~/.allmn

# Setup configuration for node.
rpcuser=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')
rpcpassword=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo '')
cat >~/.allmn/allmn.conf <<EOL
rpcuser=$rpcuser
rpcpassword=$rpcpassword
daemon=1
txindex=1
EOL

# Start node.
allmnd
