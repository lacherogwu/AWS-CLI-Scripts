const { exec } = require('child_process');
const cfg = require('./cfg.json');

const args = process.argv.slice(2);

const [path] = args;

const generateConfig = path => {
    path = path.replace(/\s/g, '\\ ');
    const split = path.split('/');
    const functionName = split[split.length - 1];

    return {
        zipFile: `fileb://${path}/${functionName}.zip`,
        functionName,
    };
};

const config = {
    runtime: cfg.runtime || 'nodejs12.x',
    role: cfg.role,
    handler: cfg.handler || 'index.handler',
    ...generateConfig(path),
};

const command = `aws lambda create-function --function-name ${config.functionName} --runtime ${config.runtime} --role ${config.role} --handler ${config.handler} --zip-file ${config.zipFile}`;

exec(command, (err, res) => {
    if(err){
        console.error(err);
    } else {
        console.log(res);
    }
});