const {cloud, local} = require("./request");
const vscode = require('vscode');
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
		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: '🤖 AI 正在阅读你的代码 ...',
				cancellable: false,
			},
			async (progress) => {
				let {localMode} = vscode.workspace.getConfiguration('cofinder');
				if(localMode.enable){
					local(action,template,code,selection,progress)
				}else{
					cloud(action,template,code,selection,progress)
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
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
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(modularFile);

	let modularSelection = vscode.commands.registerCommand('cofinder.modularSeletion', function () {
		const action = 'modular';
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(modularSelection);

	let simplifyFile = vscode.commands.registerCommand('cofinder.simplifyFile', function () {
		const action = 'simplify';
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText());
	})
	context.subscriptions.push(simplifyFile);

	let simplifySelection = vscode.commands.registerCommand('cofinder.simplifySeletion', function () {
		const action = 'simplify';
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		Invoke(action, template, editor.document.getText(editor.selection), editor.selection);
	});
	context.subscriptions.push(simplifySelection);
	let addCustomPrompt = vscode.commands.registerCommand('cofinder.addCustomPromot',function(){
		vscode.window.showQuickPick([
			{
				label:"新增自定义提示词",
				detail:"新增自定义提示词，可用于实现新增一个用户自定义的提示词。",
				description:"add"
			},
			{
				kind: vscode.QuickPickItemKind.Separator
			},
			{
				label:"Act as Linux Terminal",
				detail:"I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is pwd",
				description:"#1"
			},
			{
				label:"Act as Javascript Console",
				detail:'I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is console.log("Hello World");',
				description:"#2"
			},
			{
				label:"Act as a UX/UI Developer",
				detail:'I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is "I need help designing an intuitive navigation system for my new mobile application."',
				description:"#3"
			}
		],{
			matchOnDescription: true,
			placeHolder:"新增，或编辑已有的 Prompt"
		}).then(pick => {
			if(pick.description == "add"){
				vscode.window.showInputBox({
					title:"输入你的 Prompt 名称",
					prompt:"Prompt 名称将会出现在使用 Prompt 时的提示中，用于快速识别 Prompt"
				}).then(title => {
					vscode.window.showInputBox({
						title:`请输入 ${title} 的 prompt`,
						prompt:"Promot 将会用于发送给 OpenAI 进行补全。可将 {code} 作为代码的占位符来使用。"
					}).then(prompt => {
						vscode.window.showInformationMessage(`自定义管理 Prompt 还未完成，但我已经知道你的名称是 ${title},提示词 ${prompt}`);
					})
				})
			}
		})
	})
	context.subscriptions.push(addCustomPrompt)
	let useCustomPrompt = vscode.commands.registerCommand('cofinder.useCustomPrompt',function(){
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		const template = "<<<<<<<\r\n %2$s \r\n=======\r\n %1$s \r\n>>>>>>>";
		if (!editor) {
			vscode.window.showInformationMessage('识别失败，请联系开发者排查');
			return;
		}
		vscode.window.showQuickPick([
			{
				label:"Act as Linux Terminal",
				detail:"I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is pwd",
				description:"#1"
			},
			{
				label:"Act as Javascript Console",
				detail:'I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is console.log("Hello World");',
				description:"#2"
			},
			{
				label:"Act as a UX/UI Developer",
				detail:'I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is "I need help designing an intuitive navigation system for my new mobile application."',
				description:"#3"
			}
		],{
			matchOnDescription: true,
			placeHolder:"选择 Prompt，并应用在你选中的代码或整个文件上"
		}).then(pick => {
		
			console.log(pick);
			if(editor.selection.isEmpty){
				vscode.window.showInformationMessage('自定义 Prompt 功能尚未完成，但我看出来，你想让我对你的整个文件做的事：' + pick.label);

				// Invoke('custom', template, editor.document.getText(), editor.selection);
			}else{
				vscode.window.showInformationMessage('自定义 Prompt 功能尚未完成，但我看出来，你想让我对你选中的部分做的事：' + pick.label);

				// Invoke('custom', template, editor.document.getText(editor.selection), editor.selection);
			}
		})
	})
	context.subscriptions.push(useCustomPrompt);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
