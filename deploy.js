const ssd = require('simple-sftp-deploy')
const path = require('path')
ssd.deploy({
  is_bak: false,
  remote_path: '/data/webapps/hwagain-web/vue3-x',
  assets_path: path.resolve(__dirname, './dist'),
  host: '172.16.1.39',
  port: '22',
  user: 'hwtest',
  password: 'hwtest2019'
})

// ssd.start({
//   remote_path: '/data/webapps/hwagain-web/blog',
//   assets_path: path.resolve(__dirname, './public'),
//   host: '172.16.1.67',
//   port: '22',
//   user: 'ddtest',
//   password: 'ddtest2018'
// })
// const SSH2Utils = require('ssh2-utils')
// const ssh = new SSH2Utils()
// const server = { host: '172.16.1.67', username: 'ddtest', password: 'ddtest2018' }

// ssh.exec(server, ['ls -a', 'pwd'], function(err, stdout, stderr, server, coon) {
//   if (err) console.log(err)
//   console.log(stdout)
//   console.log(stderr)
// })
