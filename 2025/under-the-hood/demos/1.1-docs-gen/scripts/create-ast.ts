import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

// Read the TypeScript file
const filePath = path.resolve(__dirname, '../src/colored-text.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Create a SourceFile object
const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
);

// Function to convert AST nodes to a JSON-friendly format
function convertAST(node: ts.Node): any {
    const nodeInfo: any = {
        kind: ts.SyntaxKind[node.kind],
        text: node.getText(),
        children: []
    };

    node.forEachChild(child => {
        nodeInfo.children.push(convertAST(child));
    });

    return nodeInfo;
}

// Convert the AST to a JSON-friendly format
const ast = convertAST(sourceFile);

// Write the AST to a file
fs.writeFileSync(
    path.resolve(__dirname, '../dist/ast.json'),
    JSON.stringify(ast, null, 2)
);