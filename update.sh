#!/usr/bin/env bash

save="copy"
datetime=$(date +"%Y-%m-%d_%H-%M-%S")
mkdir -p logs
if [ ! -f "logs/$datetime.log" ]; then
    touch logs/$datetime.log
fi

now=$(date +"%F %T.%3N")
echo "[$now] Stopping docker..." >> logs/$datetime.log
cd DnA-backend
docker-compose down >> ../logs/$datetime.log 2>&1
cd ..

# If the first argument is "copy", then back up data
if [ "$1" == "$save" ]; then
    now=$(date +"%F %T.%3N")
    echo "[$now] Backing up data" >> logs/$datetime.log
    cp -r ./DnA-backend/build/Assets/data ./temp
fi

now=$(date +"%F %T.%3N")
echo "[$now] Deleting codebase" >> logs/$datetime.log
rm -rf DnA-backend

now=$(date +"%F %T.%3N")
echo "[$now] Downloading code from git" >> logs/$datetime.log
git clone https://github.com/TheWizardo/DnA-backend.git >> logs/$datetime.log 2>&1

now=$(date +"%F %T.%3N")
echo "[$now] Deleting TypeScript source" >> logs/$datetime.log
rm -rf DnA-backend/src

# If the first argument is "copy", then restore the data
if [ "$1" == "$save" ]; then
    now=$(date +"%F %T.%3N")
    echo "[$now] Restoring data" >> logs/$datetime.log
    rm -rf ./DnA-backend/build/Assets/data
    cp -r ./temp ./DnA-backend/build/Assets/data
    rm -rf ./temp
fi

now=$(date +"%F %T.%3N")
echo "[$now] Changing file permissions" >> logs/$datetime.log
for file in DnA-backend/build/Assets/data/*; do
    # Check if the file is a regular file
    if [[ -f "$file" ]]; then
        # Change permissions to read and write for the user
        chmod 666 "$file"
    fi
done
ls -l DnA-backend/build/Assets/data >> logs/$datetime.log

cd DnA-backend
now=$(date +"%F %T.%3N")
echo "[$now] Building docker..." >> ../logs/$datetime.log
docker-compose build >> ../logs/$datetime.log 2>&1

now=$(date +"%F %T.%3N")
echo "[$now] Starting docker..." >> ../logs/$datetime.log
docker-compose up -d >> ../logs/$datetime.log 2>&1

echo "Full log is at ./logs/$datetime.log"