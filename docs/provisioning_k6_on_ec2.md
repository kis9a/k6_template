## AMI

Get the AMI after initial provisioning: mi-xxxxxxxxxxxxxxxxx

## Initialize

### update apt

```
sudo apt-get update
sudo apt-get upgrade
```

### k6 installation

<https://k6.io/docs/getting-started/installation/>

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### install node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -; bash;
nvm install 14.4.0
nvm use 14.4.0
node -v v14.4.0
npm install -g npm@latest
npm install -g yarn
```

### git clone repo

```
cd ~
git clone "https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/kis9a/k6_template.git"
cd ~/k6_template
```
