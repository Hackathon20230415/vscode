const vscode = require('vscode');
const axios = require("axios").default;
function activate(context) {
	let reviewSelection = vscode.commands.registerCommand('cofinder.reviewSeletion', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
		}
		const document = editor.document;
		const selection = editor.selection;
		const code = document.getText(selection);

		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: '🤖 正在请 AI Review 代码中 ...',
				cancellable: false,
			},
			async (progress, token) => {
				let { server } = vscode.workspace.getConfiguration('cofinder');
				const {data} = await axios.post(`${server}/review`,{
					code: code
				});
				if(data.code == 0){
					editor.edit(editBuilder => {
						editBuilder.replace(selection, `// ${data.data} \r\n\r\n` + code);
					});
					progress.report({ increment: 100, message: "" })
					vscode.window.showInformationMessage("AI 生成成功，请查看代码前的注释内容。")
				}else{
					vscode.window.showInformationMessage("AI 生成失败，请联系开发者排查")
				}			
			}
		)
	});
	context.subscriptions.push(reviewSelection);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
