const { exec } = require('child_process');

const args = process.argv.slice(2);

const [path] = args;

const generateConfig = path => {
    const split = path.split('/');
    const functionName = split[split.length - 1];

    return {
        zipFile: `fileb://${path}/${functionName}.zip`,
        functionName,
    };
};

const config = {
    ...generateConfig(path),
};

const command = `aws lambda update-function-code --function-name ${config.functionName} --zip-file ${config.zipFile}`;

exec(command, (err, res) => {
    if(err){
        console.error(err);
    } else {
        console.log(res);
    }
});