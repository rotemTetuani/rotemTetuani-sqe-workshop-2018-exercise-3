import * as esprima from 'esprima';
import * as evaluate from 'static-eval';
import * as esgraph from 'esgraph';

export {makeFlowChart, makeEnv, ast, getType};
const box = ', shape="box" style=filled fillcolor="#ffffff';
const diamond = ', shape="diamond" style=filled fillcolor="#ffffff';

const makeFlowChart = (code, inputVector) => {
    const parsedCode = ast(code);
    const values = JSON.parse('[' + inputVector + ']');
    const params = parsedCode.body[0].params;
    const cfg = esgraph(parsedCode.body[0].body);
    cfg[2] = cfg[2].slice(1);
    for(let i=0; i <cfg[2].length ; i++) {
        cfg[2][i].number = i + 1;
    }
    traverse(cfg[2][0])(cfg[2][0], makeEnv(params, values));
    removeAndColor(cfg);
    const dot = esgraph.dot(cfg, {counter: 0});
    return dot.replaceAll(', shape', '", shape');
};

const ast = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc: true, range: true}, function (node) {
        node['expr'] = codeToParse.substring(node.range[0], node.range[1]);
    });
};

const ifStatement = (node, env) => {
    node.label = '<'+node.number+'>\n'+node.astNode.expr + ', shape="diamond" style=filled fillcolor="#A9F5BC';
    node.isInPath = true;
    evaluate(node.astNode, env) ?
        traverse(node.true)(node.true, env) :
        traverse(node.false)(node.false, env);
};

const assignmentExpression = (node, env) => {
    node.label = '<'+node.number+'>\n'+node.astNode.expr + ', shape="box" style=filled fillcolor="#A9F5BC';
    node.isInPath = true;
    env[node.astNode.left.expr] = evaluate(node.astNode.right, env);
    traverse(node.normal)(node.normal, env);
};

const variableDeclaration = (node, env) => {
    node.label = '<'+node.number+'>\n'+node.astNode.expr + ', shape="box" style=filled fillcolor="#A9F5BC';
    node.isInPath = true;
    for (let dec of node.astNode.declarations) {
        env[dec.id.expr] = evaluate(dec.init, env);
    }
    traverse(node.normal)(node.normal, env);

};

const whileStatement = (node, env) => {
    node.label = '<'+node.number+'>\n'+node.astNode.expr + ', shape="diamond" style=filled fillcolor="#A9F5BC';
    node.isInPath = true;
    evaluate(node.astNode, env) ?
        traverse(node.true)(node.true, env) :
        traverse(node.false)(node.false, env);
};

function isWhileOrIf(node) {
    return node.parent && (node.parent.type === 'IfStatement' || node.parent.type === 'WhileStatement');
}

function getType(node) {
    return isWhileOrIf(node) ?
        node.parent.type :
        node.astNode ?
            node.astNode.type
            : null;
}

const traverse = (node) => {
    const funcs = {
        'IfStatement': ifStatement,
        'WhileStatement': whileStatement,
        'AssignmentExpression': assignmentExpression,
        'VariableDeclaration': variableDeclaration
    };

    let type = getType(node);
    return funcs[type] ? funcs[type] :
        (node, env) => {
            if (node && node.astNode) {
                node.label = '<'+node.number+'>\n'+ node.astNode.expr + ', shape="box" style=filled fillcolor="#A9F5BC';
                node.isInPath = true;
                node.nextSibling ? traverse(node.nextSibling)(node.nextSibling, env) : traverse(node.normal)(node.normal, env);
            }
        };
};

String.prototype.replaceAll = function (search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const makeEnv = (params, values) => {
    let env = {};
    for (let i = 0; i < params.length; i++)
        env[params[i].expr] = values[i];
    return env;
};

function makeShape(node) {
    if (node.parent && node.astNode && !node.isInPath) {
        node.parent.type != 'IfStatement' ?
            node.label = '<'+node.number+'>\n'+node.astNode.expr + box :
            node.label = '<'+node.number+'>\n'+node.astNode.expr + diamond;
    }
}

function removeAndColor(cfg) {
    for (let node of cfg[2]) {
        node.exception = null;
        makeShape(node);
    }
}