const vscode = require('vscode');
const CourseTreeProvider_1 = require("./CourseTreeProvider");
const util = require('./util');
const fs = require('fs');
const path = require('path');
var flag = false;

function activate(context) {
	CourseTreeProvider_1.MyTreeProvider.initMyTreeList();
	context.subscriptions.push(vscode.commands.registerCommand('extension.demo.openWebview', function (uri) {
		//创建webview
		createCourseWebview(uri);
	}));
	
	function createCourseWebview(uri){
		if (flag) {
            return;
        }
		var panel = vscode.window.createWebviewPanel('testWebview', "课程内容", vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true,
            enableFindWidget: true,
		});
		flag = true;
		panel.webview.html = getWebViewContent(context, 'src/test-webview.html');
		panel.onDidDispose(() => {
            flag = false;
        }, null, context.subscriptions);
	}

	function getWebViewContent(context, templatePath) {
        const resourcePath = util.getExtensionFileAbsolutePath(context, templatePath);
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, 'utf-8');
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({
                scheme: 'vscode-resource'
            }).toString() + '"';
        });
        return html;
    }
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
