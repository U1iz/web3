const fs = require('fs')

// 文件操作
function catchErr(err, [msg, resolve, reject, success, failed]) {
    // console.log(arguments);
    return err ? (() => {
        // 失败
        failed ? console.error(failed) : null;
        reject(err, msg, failed);
        return false;
    })() : (() => {
        // 成功
        success ? console.log(success) : null;
        resolve(msg, success);
        return true;
    })();
}

function LegalStr(solve, str) {
    /**
     * 字符合法化
     * @param {boolean} solve 是否处理
     * @param {string} str 目录、文件名
     */
    // 如果在Windows系统下，替换掉路径中的无效字符: process.platform === 'win32'
    if (solve) return str.replace(/[<>:"/\\|?*]+/g, '');
    return str;
}
const fileOperator = {
    createFolder: ({
        path,
        sync,
        Legal
    }) => {
        /**
         * * 创建文件夹，可一次性创建多层
         * @param {string} path 需要创建的文件夹名称
         * @param {boolean} sync 是否异步执行
         * @param {boolean} Legal 是否合法化字符串（往后不再赘述）
         */
        const dir = `${__dirname}/${LegalStr(Legal, path)}`,
            opinion = {
                recursive: true
            };
        return new Promise((resolve, reject) => {
            const paramSet = [dir, resolve, reject, '已成功创建文件夹', '文件夹创建失败'];
            if (!fs.existsSync(dir)) {
                if (sync) {
                    // 同步
                    let error;
                    try {
                        fs.mkdirSync(dir, opinion);
                    } catch (err) {
                        error = err;
                    } finally {
                        catchErr(error, paramSet)
                    }
                } else {
                    // 异步
                    fs.mkdir(dir, opinion, err => catchErr(err, paramSet));
                }
            } else {
                console.log('文件夹已存在');
                resolve(dir);
            }
        })
    },
    deleteFolder: ({
        path,
        sync,
        Legal
    }) => {
        /**
         * * 删除文件夹，一次只能删除最末尾的目录
         * ! 删除文件夹需要先清空文件夹
         * @param {string} path 需要删除的文件夹名称
         * @param {boolean} sync 是否异步执行
         */

        const dir = `${__dirname}/${LegalStr(Legal, path)}`
        return new Promise((resolve, reject) => {
            const paramSet = [dir, resolve, reject, '已成功删除文件夹', '文件夹删除失败'];
            if (sync) {
                let error;
                try {
                    // 同步
                    fs.rmdirSync(dir)
                } catch (err) {
                    error = err;
                } finally {
                    catchErr(error, paramSet)
                }
            } else {
                // 异步
                fs.rmdir(dir, err => catchErr(err, paramSet))
            }
        })
    },
    createFile: ({
        file = 'none.txt',
        content = '文件内容',
        flag = 'a',
        sync,
        Legal
    } = {}) => {
        /**
         * * 将内容写入文件中。如果文件不存在，会自动创建文件。
         * ! 仅能创建文件，不能自动创建目录
         * @param {string} file 需要创建的文件路径
         * @param {string} content 需要写入的文件内容，必须是字符串类型
         * @param {string} flag 写入方式（a：追加写入；w：覆盖写入）
         */
        const opt = {
            flag: flag
        }

        const dir = `${__dirname}/${LegalStr(Legal, file)}`;

        return new Promise((resolve, reject) => {
            const paramSet = [dir, resolve, reject, '数据写入成功', '数据写入失败'];
            if (sync) {
                // 同步
                const fd = fs.openSync(dir, flag)
                let error;
                try {
                    fs.writeFileSync(fd, content, opt)
                } catch (err) {
                    error = err;
                } finally {
                    catchErr(error, paramSet)
                    fs.closeSync(fd)
                }
            } else {
                // 异步
                fs.open(dir, flag, (err, fd) => {
                    if (err) {
                        reject(err, dir, '文件打开失败')
                    } else {
                        fs.writeFile(fd, content, opt, err => {
                            fs.close(fd);
                            catchErr(err, paramSet)
                        })
                    }
                })
            }
        })
    },
    deleteFile: ({
        file,
        sync,
        Legal
    }) => {
        /**
         * * 删除文件
         * @param {string} file 需要创建的文件路径
         * @param {boolean} sync 是否同步
         */

        const dir = `${__dirname}/${LegalStr(Legal, file)}`;
        return new Promise((resolve, reject) => {
            const paramSet = [dir, resolve, reject, '成功删除文件', '删除文件失败'];
            if (sync) {
                // 同步
                let error;
                try {
                    fs.unlinkSync(dir);
                } catch (err) {
                    error = err;
                } finally {
                    catchErr(error, paramSet)
                }
            } else {
                // 异步
                fs.unlink(dir, err => {
                    catchErr(err, paramSet)
                })
            }
        })
    },
    readFile: ({
        file,
        sync,
        Legal
    }) => {
        /**
         * @param {string} file 需要读取的文件路径
         */
        const dir = `${__dirname}/${LegalStr(Legal, file)}`;
        return new Promise((resolve, reject) => {
            if (sync) {
                // 同步
                let error, data;
                try {
                    data = fs.readFileSync(dir);
                } catch (err) {
                    error = err;
                } finally {
                    if (error) {
                        reject(err, dir, '文件读取失败')
                        return;
                    }
                    // data 是二进制类型，需要转换成字符串
                    resolve(data.toString(), '文件读取成功')
                }
            } else {
                // 异步
                fs.readFile(dir, (err, data) => {
                    if (err) {
                        reject(err, dir, '文件读取失败')
                        return;
                    }
                    // data 是二进制类型，需要转换成字符串
                    resolve(data.toString(), '文件读取成功')
                })
            }
        })
    }
}

// 执行操作
const opinion = {
    path: 'test',
    sync: true,
    legal: false,

    file: 'test/test.txt',
    content: Math.floor(Math.random() * 1024).toString()
}

new Promise(resolve => {
    execute()
        .then(execute)
        .then(resolve)
}).then(() => {
    console.log('------简洁写法------');
    fileOperator.createFolder(opinion)
        .then(() => fileOperator.createFile(opinion))
        .then(() => fileOperator.readFile(opinion))
        .then(data => {
            console.log('文件内容：', data);
            fileOperator.deleteFile(opinion)
        })
        .then(() => fileOperator.deleteFolder(opinion))
        .then(() => console.log('执行完成'))
})
/* fileOperator.createFile(opinion).then(res => {
    console.log(res);
    fileOperator.readFile(opinion).then(res => {
        console.log(res)
        fileOperator.deleteFile(opinion).then(res => console.log(res))
    })
}).catch(err => console.log(err)) */

/* fileOperator.createFolder(opinion).then(res => {
    fileOperator.deleteFolder(opinion)
}) */
function execute() {
    console.log('------完整写法------');
    // 完整测试流程：创建文件夹 => 在文件夹内创建文本文件 => 读取创建的文本内容 => 删除文本文件 => 删除文件夹
    return new Promise(resolve => {
            // 先创建文件夹
            fileOperator.createFolder(opinion)
                .then((dir, msg) => resolve(dir))
                .catch((err, dir, msg) => {
                    throw new Error(err, dir)
                })
        })
        .then(dir => {
            return new Promise(resolve => {
                // 创建文件并写入内容
                fileOperator.createFile(opinion)
                    .then(dir => resolve(dir))
                    .catch((err, dir) => {
                        throw new Error(err, dir)
                    })
            })
        })
        .then(msg => {
            return new Promise(resolve => {
                // 读取文件
                fileOperator.readFile(opinion)
                    .then(dir => {
                        resolve(dir)
                    })
                    .catch((err, dir) => {
                        throw new Error(err, dir);
                    })
            })
        })
        .then(msg => {
            console.log('文件内容：', msg);
            return new Promise(resolve => {
                // 删除文件
                fileOperator.deleteFile(opinion)
                    .then(dir => {
                        resolve(dir)
                    })
                    .catch((err, dir) => {
                        throw new Error(err, dir);
                    })
            })
        })
        .then(msg => {
            return new Promise(resolve => {
                // 最后删除文件夹
                fileOperator.deleteFolder(opinion)
                    .then(dir => {
                        resolve(dir)
                    })
                    .catch((err, dir) => {
                        throw new Error(err, dir);
                    })
            });
        })
        .catch((err, msg) => {
            throw new Error(err, msg);
        })
}
/* -------------------分割线------------------- */
// 来自ChatGPT的回复 所有的mode可选值
const flag = {
    "r": "只读模式。指定后，文件以只读模式打开。如果文件不存在，则发生异常。",
    "r+": "可读写模式。指定后，文件以可读写模式打开。如果文件不存在，则发生异常",
    "rs+": "同步可读写模式。指定后，保证本地磁盘文件数据的顺序一致性，以访问的方式打开，提供同步和异步两种写入方式。不会把文件内容刷到内存中，但可以使你在POSIX上实现'同步I/O操作'",
    "w": "写模式。指定后，文件以写入模式打开。如果文件不存在，则创建一个新文件；否则，清空文件。",
    "wx": "排他写入模式。与 'w' 模式类似，但如果文件路径已经存在，则无法使用该标志创建或打开它。",
    "w+": "读写模式。指定后，文件以读取和写入模式打开。如果文件不存在，则创建一个新文件。",
    "wx+": "与 'w+' 类似，但如果文件路径已经存在，则无法使用该标志创建或打开它。",
    "a": "追加模式。指定后，如果文件存在，则将写入块追加到现有文件中。否则，将创建一个新文件以进行写入。",
    "ax": "排他的追加模式。与 'a' 模式类似，但如果文件路径已经存在，则无法使用该标志创建或打开它。",
    "a+": "读取和追加模式。在文件末尾以添加方式打开。否则，新建一个文件进行读取和写入。",
    "ax+": "与'a+'匹配，但如果文件路径已经存在，则无法使用该标志创建或打开它。"
}