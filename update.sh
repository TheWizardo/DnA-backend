rm -rf DnA-backend
git clone https://github.com/TheWizardo/DnA-backend.git
mkdir DnA-backend/logs
touch DnA-backend/logs/backend.log

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] stopping pm2 service" >> DnA-backend/logs/backend.log

pm2 stop backend

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] pm2 service stopped" >> DnA-backend/logs/backend.log


now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] deleteing typescript source" >> DnA-backend/logs/backend.log

rm -rf DnA-backend/src

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] typescript source deleted" >> DnA-backend/logs/backend.log


now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] changing log files permissions" >> DnA-backend/logs/backend.log

chmod 666 DnA-backend/logs/backend.log

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] log files permissions chnaged" >> DnA-backend/logs/backend.log


now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] installing dependencies" >> DnA-backend/logs/backend.log

cd DnA-backend/build
npm i

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] dependencies installed" >> ../logs/backend.log

cd ..
cd ..

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] startinf pm2 service" >> DnA-backend/logs/backend.log

pm2 start