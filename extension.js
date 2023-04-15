const { Range } = require('vscode');
const vscode = require('vscode');
const axios = require("axios").default;
function activate(context) {
	/**
	 * 服务端 Review 函数（带进度条）
	 * @param {string} code 需要进行 Review 的 Code
	 * @param {Range} selection 具体的范围，如果不传递，则为全文 Review
	 */
	function Invoke(action,code,selection = null){
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;

		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: '🤖 AI 正在阅读你的代码 ...',
				cancellable: false,
			},
			async (progress, token) => {
				let { server } = vscode.workspace.getConfiguration('cofinder');
				const {data} = await axios.post(`${server}/${action}`,{
					code: code
				});
				if(data.code == 0){
					editor.edit(editBuilder => {
						if(selection == null){
							let fullPageRange = new Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end)
							editBuilder.replace(fullPageRange, `// ${data.data} \r\n\r\n` + code)
						}else{
							editBuilder.replace(selection, `// ${data.data} \r\n\r\n` + code);
						}
					});
					progress.report({ increment: 100, message: "" })
					vscode.window.showInformationMessage("🤖 AI 理解成功，请查看代码前的 AI 为你写的建议。")
				}else{
					vscode.window.showInformationMessage("🤖 AI 理解失败，请联系开发者排查")
				}			
			}
		)
	}
	let reviewSelection = vscode.commands.registerCommand('cofinder.reviewSeletion', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
		}
		const document = editor.document;
		const selection = editor.selection;
		const code = document.getText(selection);
		Invoke('review',code,selection);
		
	});
	let reviewFile = vscode.commands.registerCommand("cofinder.reviewFile",function(){
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
		}
		const document = editor.document;
		const code = document.getText();
		Invoke('review',code);
	})
	context.subscriptions.push(reviewSelection);
	context.subscriptions.push(reviewFile);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
