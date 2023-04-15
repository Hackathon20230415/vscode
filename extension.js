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
		const template = "/*\r\n %s \r\n*/\r\n%s";
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
		const template = "/*\r\n %s \r\n*/\r\n%s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(reviewFile);

	let rewriteFile = vscode.commands.registerCommand("cofinder.rewriteFile", function () {
		const action = "rewrite";
		const template = "/*\r\n %s \r\n*/\r\n%s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(rewriteFile);

	let rewriteSelection = vscode.commands.registerCommand('cofinder.rewriteSeletion', function () {
		const action = "rewrite";
		const template = "/*\r\n %s \r\n*/\r\n%s";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("识别失败，请联系开发者排查");
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(rewriteSelection);
	let beautifyFile = vscode.commands.registerCommand('cofinder.beautifyFile', function () {
		const action = 'beautify';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(beautifyFile);

	let beautifySelection = vscode.commands.registerCommand('cofinder.beautifySeletion', function () {
		const action = 'beautify';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(beautifySelection);
	let commentFile = vscode.commands.registerCommand('cofinder.commentFile', function () {
		const action = 'comment';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(commentFile);

	let commentSelection = vscode.commands.registerCommand('cofinder.commentSeletion', function () {
		const action = 'comment';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(commentSelection);

	let inspireFile = vscode.commands.registerCommand('cofinder.inspireFile', function () {
		const action = 'inspire';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(inspireFile);

	let inspireSelection = vscode.commands.registerCommand('cofinder.inspireSeletion', function () {
		const action = 'inspire';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(inspireSelection);

	let refactorFile = vscode.commands.registerCommand('cofinder.refactorFile', function () {
		const action = 'refactor';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(refactorFile);

	let refactorSelection = vscode.commands.registerCommand('cofinder.refactorSeletion', function () {
		const action = 'refactor';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(refactorSelection);

	let upgradeFile = vscode.commands.registerCommand('cofinder.upgradeFile', function () {
		const action = 'upgrade';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(upgradeFile);

	let upgradeSelection = vscode.commands.registerCommand('cofinder.upgradeSeletion', function () {
		const action = 'upgrade';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(upgradeSelection);

	let cleanFile = vscode.commands.registerCommand('cofinder.cleanFile', function () {
		const action = 'clean';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(cleanFile);

	let cleanSelection = vscode.commands.registerCommand('cofinder.cleanSeletion', function () {
		const action = 'clean';
		const template = '/*\r\n %s \r\n*/\r\n%s';
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(cleanSelection);

		let modularFile = vscode.commands.registerCommand('cofinder.modularFile', function () {
			const action = 'modular';
			const template = '/*\r\n %s \r\n*/\r\n%s';
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('识别失败，请联系开发者排查');
				return;
			}
			Invoke(action,template, editor.document.getText());
		})
		context.subscriptions.push(modularFile);
	
		let modularSelection = vscode.commands.registerCommand('cofinder.modularSeletion', function () {
			const action = 'modular';
			const template = '/*\r\n %s \r\n*/\r\n%s';
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('识别失败，请联系开发者排查');
				return;
			}
			Invoke(action,template, editor.document.getText(editor.selection), editor.selection);
		});
		context.subscriptions.push(modularSelection);

			let simplifyFile = vscode.commands.registerCommand('cofinder.simplifyFile', function () {
				const action = 'simplify';
				const template = '/*\r\n %s \r\n*/\r\n%s';
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					vscode.window.showInformationMessage('识别失败，请联系开发者排查');
					return;
				}
				Invoke(action,template, editor.document.getText());
			})
			context.subscriptions.push(simplifyFile);
		
			let simplifySelection = vscode.commands.registerCommand('cofinder.simplifySeletion', function () {
				const action = 'simplify';
				const template = '/*\r\n %s \r\n*/\r\n%s';
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					vscode.window.showInformationMessage('识别失败，请联系开发者排查');
					return;
				}
				Invoke(action,template, editor.document.getText(editor.selection), editor.selection);
			});
			context.subscriptions.push(simplifySelection);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
