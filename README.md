# Backend for the demons-and-angels project

## PM2
pm2 is in charge of managing the process and starting it upon reboot.
<br />
Settings can be viewed and edited in the ```ecosystem.config.js``` file. 

## How to upload changes
1. Run ```npm run build``` (Make sure the ```package.json``` file and the ```Assets``` folder gets copied correctly.)
2. Commit your changes.
3. ssh into the ec2 instance using the command ```ssh -i <pem_file_path> ec2-user@<public_dns_name>```
4. Run ```update.sh``` as root.
5. in case a collision with any of the ports run the following steps:
   a. run ```netstat -tuln``` to check if the ports are indeed in use.
   b. run the command ```systemctl list-units | grep "pm2"``` and see if the pm2 processes are running.
   c. stop the services using the command: ```systemctl stop pm2-ec2-user;systemctl stop pm2-root```
   d. start the root service using ```systemctl start pm2-root```

## Certificate Handling
### Creation Process
1. Running the command ```certbot certonly --manual``` will propmt a challenge certbot needs to verify.
   - The challenge will most likely be to receive a certain text when acessing a certain path. if so, notice that ```res.json("text")``` will send ```text``` as a string whereas ```res.send("text")``` will send it as plain text. use ```res.send```.
   - This challenge is verified on HTTP, so make sure port 80 is open in the instance inbound rules.
   - To forward port 80 to any other port, use the command ```iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports <PORT>```
   - Pressing Enter will trigger the verification process, so upload and apply all the changes beforehand.
2. Upon completion, certbot will generate 4 files ```privkey.pem, cert.pem, chain.pem, fullchain.pem``` (usually located at ```/etc/letsencrypt/live/<domain-name>```). Where ```fullchain.pem``` is just a concatination of ```cert.pem``` followed by ```chain.pem```.
### Integration
The four files created by certbot are actully symbolic links (symlinks) to the actual files.
<br />
Because the pm2 process is run as the ```ec2-user```, make sure that all the necessary have read permissions for non-root users. (folders need execution permissions as well)
  - It it very important to give these permissions for all folders leading up to these files! Otherwise, the program will crash. 
