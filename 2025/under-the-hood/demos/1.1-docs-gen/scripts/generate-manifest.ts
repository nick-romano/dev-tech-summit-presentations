import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from 'custom-elements-manifest/schema';

const filePath = path.resolve(__dirname, '../src/colored-text.ts');
const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true
);

const manifest: schema.Package = {
    schemaVersion: '1.0.0',
    readme: '',
    modules: []
};

function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
        const classInfo: schema.ClassDeclaration = {
            kind: 'class',
            name: node.name?.text || '',
        };

        const members = node.members.reduce((acc, member) => {
            if (ts.isPropertyDeclaration(member)) {
                if(member.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword) && member.name.getText() === 'observedAttributes') {
                    // don't include static observedAttributes property, its an internal implementation detail for custom elements and not relevant to consumers
                    return acc;
                }

                acc.push({
                    kind: 'field',
                    name: member.name.getText(),
                    default: member.initializer?.getText(),
                    ...member.type ? { type: {
                        text: member.type?.getText()
                    }} : {}
                });
            } else if (ts.isMethodDeclaration(member)) {
                acc.push({
                    kind: 'method',
                    name: member.name.getText(),
                    parameters: member.parameters.map(param => ({
                        name: param.name.getText(),
                    })),
                });
            }
            return acc;
        }
        , [] as schema.ClassMember[]);
        classInfo.members = members;
    

        manifest.modules.push({
            kind: 'javascript-module',
            path: filePath,
            declarations: [classInfo]
        });
    }

    ts.forEachChild(node, visit);
}

visit(sourceFile);

fs.writeFileSync(
    path.resolve(__dirname, '../dist/custom-elements.json'),
    JSON.stringify(manifest, null, 2)
);
