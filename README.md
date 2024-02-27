# Backend for the demons-and-angels project

## How to upload changes
1. run ```npm run build``` (Make sure the ```package.json``` file and the ```Assets``` folder gets copied correctly.)
2. commit your changes.
3. ssh into the ec2 instance using the command ```ssh -i <pem_file_path> ec2-user@<public_dns_name>
4. run ```update.sh``` as root.