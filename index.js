const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const files = getFiles();
    const regex = /\/\/ TODO (.+)/g;
    let todo = [];
    for (const file of files) {
        todo.push(...getTodoText(file, regex));
    }
    switch (command.split(' ')[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (const to of todo)
                console.log(to.slice(8));
            break;
        case 'important':
            for (const to of todo) {
                if (to.indexOf('!') !== -1) {
                    console.log(to.slice(8));
                }
            }
            break;
        case 'user':
            const user = command.split(' ')[1];
            for (const to of todo) {
                if (to.indexOf(';') !== -1) {
                    const parseStr = to.split(';');
                    if (user === parseStr[0].slice(8)) {
                        const com = parseStr[parseStr.length - 1];
                        console.log(com);
                    }
                }
            }
            break;
        case 'date':
            const date = new Date(command.split(' ')[1]);
            for (const to of todo) {
                if (to.indexOf(';') !== -1) {
                    const parseStr = to.split(';');
                    const comData = new Date(parseStr[1]);
                    if (comData.getDay() >= date.getDay()) {
                        console.log(to.slice(8));
                    }
                }
            }
            break;

        default:
            console.log('wrong command');
            break;
    }
}

function getTodoText(str, regex) {
    return str.match(regex);
}

// TODO you can do it!
