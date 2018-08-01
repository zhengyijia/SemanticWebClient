module.exports = {
    version: '1.0.0',
    ssh: {
        host: 'xxx.xxx.xxx.xxxx', //可以配置多台服务器
        port: 22,
        username: 'xxxx',
        password: 'xxxx'
    },
    remoteDir: '/root/zyj/apache-tomcat-8.0.53/webapps/semanticweb-client/',
    commands: [
        'rm -rf /root/zyj/apache-tomcat-8.0.53/webapps/semanticweb-client/'
    ]
};