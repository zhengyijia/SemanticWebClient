module.exports = {
    version: '1.0.0',
    ssh: {
        host: '10.2.1.169', //可以配置多台服务器
        port: 22,
        username: 'root',
        password: 'hbaserootsiat'
    },
    remoteDir: '/root/zyj/apache-tomcat-8.0.53/webapps/semanticweb-client/',
    commands: [
        'rm -rf /root/zyj/apache-tomcat-8.0.53/webapps/semanticweb-client/'
    ]
};