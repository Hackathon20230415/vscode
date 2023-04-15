const { Range } = require('vscode');
const vscode = require('vscode');
const axios = require("axios").default;
const printf = require("fast-printf").printf;
function activate(context) {
	/**
	 * 服务端 Review 函数（带进度条）
	 * @param {string} action 需要进行的操作，可选项有 
	 * 	review - 代码 Review
	 *  beautify - 代码美化
	 *  comment - 添加注释
	 *  simplify - 简化
	 *  clean - 净化
	 *  refactor - 重构
	 *  rewrite - 重写
	 *  modular - 模块化
	 *  upgrade - 更新
	 *  inspire - 灵感
	 * @param {string} code 需要进行 Review 的 Code
	 * @param {Range} selection 具体的范围，如果不传递，则为全文 Review
	 */
	function Invoke(action, template, code, selection = null) {
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;

		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: '🤖 AI 正在阅读你的代码 ...',
				cancellable: false,
			},
			async (progress) => {
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
		)
	}
	/**
	 * CoReview
	 */
	let reviewSelection = vscode.commands.registerCommand('cofinder.reviewSeletion', function () {
		const action = "review";
		const template = "//%s \r\n %s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(reviewSelection);

	let reviewFile = vscode.commands.registerCommand("cofinder.reviewFile", function () {
		const action = "review";
		const template = "//%s \r\n %s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action,template, editor.document.getText());
	})
	context.subscriptions.push(reviewFile);

	let rewriteFile = vscode.commands.registerCommand("cofinder.rewriteFile", function () {
		const action = "rewrite";
		const template = "//%s \r\n %s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action,template, editor.document.getText());
	})
	context.subscriptions.push(rewriteFile);

	let rewriteSelection = vscode.commands.registerCommand('cofinder.rewriteSeletion', function () {
		const action = "rewrite";
		const template = "//%s \r\n %s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action,template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(rewriteSelection);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
