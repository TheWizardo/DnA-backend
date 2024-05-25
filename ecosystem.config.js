module.exports = {
  apps : [{
    script: 'DnA-backend/build/app.js',
    watch: false,
    name: "backend",
    log_file: "DnA-backend/logs/backend.log",
    time: true,
    listen_timeout: 10000,
    max_restarts: 15,
    restart_delay: 250,
    env: {
        "NODE_ENV": "production",
        "HTTPS_PORT": 4272,
        "HTTP_PORT": 8080
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};