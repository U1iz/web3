### js中的一些用法



[TOC]

#### Unicode转换

###### 字符转为Unicode

```js
function toUnicode(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += '\\u' + ('0000' + str.charCodeAt(i).toString(16)).substr(-4);
  }
  console.log(result);
  return result;
}
```



```js
toUnicode('abcd')
// '\\u0061\\u0062\\u0063\\u0064'
```



#### 获取粘贴数据

###### 获取粘贴的内容以及格式（仅适用于文字）

```js
document.addEventListener('paste', event => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
        const types = clipboardData.types;
        let data = {};
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            data[type] = clipboardData.getData(type);
        }
        console.log(data);
    }
})
```



当用户粘贴数据时，会获取到所有的粘贴内容

```json
{
    "text/plain": "console.log(data);",
    "text/html": "<html>\r\n<body>\r\n<!--StartFragment--><div style=\"color: #abb2bf;background-color: #23272e;font-family: Consolas, 'Courier New', monospace;font-weight: normal;font-size: 14px;line-height: 19px;white-space: pre;\"><div><span style=\"color: #e5c07b;\">console</span><span style=\"color: #abb2bf;\">.</span><span style=\"color: #61afef;\">log</span><span style=\"color: #abb2bf;\">(</span><span style=\"color: #e06c75;\">data</span><span style=\"color: #abb2bf;\">);</span></div></div><!--EndFragment-->\r\n</body>\r\n</html>",
    "vscode-editor-data": "{\"version\":1,\"isFromEmptySelection\":false,\"multicursorText\":null,\"mode\":\"html\"}"
}
```



###### 获取粘贴的所有数据

```js
document.addEventListener('paste', event => {
    const items = event.clipboardData.items
    let data = {
        file: []
    }

    new Promise(resolve => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                const type = item.type
                const file = item.getAsFile()

                if (file) {
                    // 如果file对象不为null，则为文件
                    fileInfo(file).then(e => {
                        data.file.push(e)
                    })
                } else {
                    // 粘贴内容为文本
                    item.getAsString(str => {
                        data[type] = str
                        if (!data['text/plain']) {
                            data['text/plain'] = str
                        }
                    })
                }
                resolve(data)
            }
        })
        .then(data => console.log(data))
})
```

如果粘贴的是文字

```json
{
    "file": [],
    "text/plain": "return data",
    "text/html": "<html>\r\n<body>\r\n<!--StartFragment--><div style=\"color: #abb2bf;background-color: #23272e;font-family: Consolas, 'Courier New', monospace;font-weight: normal;font-size: 14px;line-height: 19px;white-space: pre;\"><div><span style=\"color: #c678dd;\">return</span><span style=\"color: #abb2bf;\"> </span><span style=\"color: #e06c75;\">data</span></div></div><!--EndFragment-->\r\n</body>\r\n</html>",
    "vscode-editor-data": "{\"version\":1,\"isFromEmptySelection\":false,\"multicursorText\":null,\"mode\":\"html\"}"
}
```

如果粘贴的是文件

```json
{
    "file": [{
        "file": "[object Object]",
        "base64": "",
        "mime": "",
        "blobUrl": ""
    }]
}
```



#### 获取文件数据

> http://96yzl.free3v.work/tools/img2data.html

###### 仅获取 `base64` 跟 `mime类型`

```js
function fileInfo(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("没有文件")
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result;
            const mime = base64.match(/:(.*?);/)[1];
            const result = {
                base64: base64,
                mime: mime
            };
            resolve(result);
        };
        reader.onerror = reject;
    })
}
```



```json
{
    "file": "[object Object]",
    "base64": "",
    "mime": ""
}
```



###### 额外获取 `blobUrl`

```js
function fileInfo(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("没有文件")
        }
        const reader = new FileReader();
        const blobUrl = new FileReader();
        reader.readAsDataURL(file);
        blobUrl.readAsArrayBuffer(file)
        return new Promise((resolve, reject) => {
                reader.onload = () => {
                    const base64 = reader.result;
                    const mime = base64.match(/:(.*?);/)[1];
                    const result = {
                        base64: base64,
                        mime: mime
                    };
                    resolve(result);
                };
                reader.onerror = reject;
            })
            .then(result => {
                blobUrl.onload = event => {
                    const buffer = event.target.result;
                    const url = window.URL.createObjectURL(new Blob([buffer], {
                        type: result.mime
                    }))
                    result.blobUrl = url;
                    resolve(result)
                }
                blobUrl.onerror = reject;
            })
    })
}
```



```json
{
    "base64": "",
    "mime": "",
    "blobUrl": ""
}
```

