const vscode = require('vscode');
function activate(context) {
	let reviewSelection = vscode.commands.registerCommand('cofinder.reviewSeletion', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const code = document.getText(selection);
			editor.edit(editBuilder => {
				editBuilder.replace(selection,"// Hello World \r\n"  + code);
			});
		
		} else {
			console.log("failed get editor")
		}
		vscode.window.showInformationMessage('Review Whole File');
	});
	context.subscriptions.push(reviewSelection);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
