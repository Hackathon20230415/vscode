const vscode = require('vscode');
const { Range } = require('vscode');
const axios = require("axios").default;
const printf = require("fast-printf").printf;
async function cloud(action, template, code, selection = null,progress) {
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
        });
        progress.report({ increment: 100, message: "" })
        vscode.window.showInformationMessage("🤖 AI 理解成功，请查看代码前的 AI 为你写的建议。")
    } else {
        vscode.window.showInformationMessage("🤖 AI 理解失败，请联系开发者排查")
    }
}
module.exports = {
    cloud,
    
}
