const vscode = require('vscode');
function activate(context) {
	console.log('Congratulations, your extension "maxiaobai" is now active!');

	let reviewFile = vscode.commands.registerCommand('maxiaobai.reviewFile', function () {
		vscode.window.showInformationMessage('Review Whole File');
	});
	let reviewSelection = vscode.commands.registerCommand('maxiaobai.reviewSeletion', function () {
		vscode.window.showInformationMessage('Review Whole File');
	});


	context.subscriptions.push(reviewFile);
	context.subscriptions.push(reviewSelection);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
