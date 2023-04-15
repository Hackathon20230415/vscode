const vscode = require('vscode');
const { Range } = require('vscode');
const axios = require("axios").default;
const printf = require("fast-printf").printf;
const { Configuration, OpenAIApi } = require("openai");
async function cloud(action, template, code, selection = null, progress) {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;

    let { server } = vscode.workspace.getConfiguration('cofinder');
    const { data } = await axios.post(`${server}/${action}`, {
        code: code
    });
    if (data.code == 0) {
        editor.edit(editBuilder => {
            if (selection == null) {
                let fullPageRange = new Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end)
                editBuilder.replace(fullPageRange, printf(template, data.data, code))
            } else {
                editBuilder.replace(selection, printf(template, data.data, code));
            }
            progress.report({ increment: 100, message: "" })
            vscode.window.showInformationMessage("🤖 AI 理解成功，请查看代码前的 AI 为你写的建议。")
        });
    } else {
        vscode.window.showInformationMessage("🤖 AI 理解失败，请联系开发者排查")
    }
}
async function local(action, template, code, selection = null, progress) {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    let { localMode } = vscode.workspace.getConfiguration('cofinder');

    let templateString = localMode.prompt[action];
    const configuration = new Configuration({
        apiKey: localMode.key,
    });
    const openai = new OpenAIApi(configuration);
    if(localMode.model == "text-davinci-003"){
        const { status, data } = await openai.createCompletion({
            model: localMode.model,
            prompt: templateString.replace("{code}", code),
            max_tokens: 1024,
            temperature: 0.9,
        });
        if (status == 200) {
            editor.edit(editBuilder => {
                if (selection == null) {
                    let fullPageRange = new Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end)
                    editBuilder.replace(fullPageRange, printf(template, data.choices[0].text, code))
                } else {
                    editBuilder.replace(selection, printf(template, data.choices[0].text, code));
                }
                progress.report({ increment: 100, message: "" })
                vscode.window.showInformationMessage("🤖 AI 理解成功，请查看代码前的 AI 为你写的建议。")
            });
    
        } else {
            vscode.window.showInformationMessage("🤖 AI 理解失败，请联系开发者排查")
        }
    }else{
        const {data,status} = await openai.createChatCompletion({
            model: localMode.model,
            messages: [{role: "system", content: templateString.replace("{code}", code)}],
          });

        if (status == 200) {
            console.log(data.choices,data.choices[0].message)
            editor.edit(editBuilder => {
                if (selection == null) {
                    let fullPageRange = new Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end)
                    editBuilder.replace(fullPageRange, printf(template, data.choices[0].message.content, code))
                } else {
                    editBuilder.replace(selection, printf(template, data.choices[0].message.content, code));
                }
                progress.report({ increment: 100, message: "" })
                vscode.window.showInformationMessage("🤖 AI 理解成功，请查看代码前的 AI 为你写的建议。")
            });
    
        } else {
            vscode.window.showInformationMessage("🤖 AI 理解失败，请联系开发者排查")
        }
    }
    

}
module.exports = {
    cloud,
    local
}
