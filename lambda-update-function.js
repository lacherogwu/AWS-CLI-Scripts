const { exec } = require('child_process');

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
    ...generateConfig(path),
};

const commands = [
    'zip -r "${PWD##*/}".zip ./', // creates zip file
    `aws lambda update-function-code --function-name ${config.functionName} --zip-file ${config.zipFile}`, // updating lambda function
    'rm "${PWD##*/}".zip', // removes zip file
];

(async () => {

    for(const command of commands){
        await new Promise(r => {
            exec(command, (err, res) => {
                if(err){
                    console.error(err);
                } else {
                    console.log(res);
                    r();
                }
            });
        });
    }
})();