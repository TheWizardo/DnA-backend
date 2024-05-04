pm2 stop backend
rm -rf DnA-backend
git clone https://github.com/TheWizardo/DnA-backend.git
mkdir DnA-backend/logs
touch DnA-backend/logs/backend.log

now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] deleteing typescript source" >> DnA-backend/logs/backend.log
rm -rf DnA-backend/src
now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] typescript source deleted" >> DnA-backend/logs/backend.log


now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] changing file permissions" >> DnA-backend/logs/backend.log
chmod 666 DnA-backend/logs/backend.log
now=$(date +"%Y-%m-%dT%H:%M:%S")
echo "[$now] file permissions changed" >> DnA-backend/logs/backend.log

for file in "DnA-backend/build/Assets/data"/*; do
    # Check if the file exists and is a regular file
    if [[ -f "$file" ]]; then
        # Change permissions to read and write for the user
        chmod 666 "$file"
    fi
done

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

reboot