"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");

class MyTreeProvider {
    constructor() { }
    
    static initMyTreeList() {
        let myTreeProvider = new MyTreeProvider();
        vscode.window.registerTreeDataProvider("test_ID", myTreeProvider);
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        let trees = [];

        let temp1 = new vscode.TreeItem("测试1");
        let temp2 = new vscode.TreeItem("测试2");
        let temp3 = new vscode.TreeItem("测试3");
        trees.push(temp1);
        trees.push(temp2);
        trees.push(temp3);

        vscode.commands.executeCommand('extension.demo.openWebview');

        return new Promise(resolve => {
            return resolve(trees);
        });
    }
}
exports.MyTreeProvider = MyTreeProvider;
//# sourceMappingURL=CourseTreeProvider.js.map