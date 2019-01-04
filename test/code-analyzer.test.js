import assert from 'assert';
import {ast, makeEnv, makeFlowChart} from '../src/js/code-analyzer';

describe('1.unit testing over the cfg environment', () => {
    it('is the function make env works correctly', () => {
        assert.deepEqual(makeEnv(ast('function foo(x, y, z){\n' +
            '   return z;\n' +
            '}').body[0].params, JSON.parse('[1,2,3]')), {x: 1, y: 2, z: 3});
    });
});

describe('2.unit testing over the cfg environment', () => {
    it('is the function make env works correctly', () => {
        assert.deepEqual(makeEnv(ast('function foo(a, b, c ,d){\n' +
            '   return z;\n' +
            '}').body[0].params, JSON.parse('[1,2,3,4]')), {a: 1, b: 2, c: 3, d:4});
    });
});

describe('3.unit testing over the cfg environment', () => {
    it('is the function make env works correctly', () => {
        assert.deepEqual(makeEnv(ast('function foo(x){\n' +
            '   return z;\n' +
            '}').body[0].params, JSON.parse('[0]')), {x: 0});
    });
});

describe('4.unit testing over basic function', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x,y,z){\n' +
            '1;\n' +
            'return z;\n' +
            '}', '1,2,3'), 'n0 [label="<1>\n' +
            '1", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'return z;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n');
    });
});

describe('5.unit testing over basic function', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            'let a=x+1;\n' +
            '}', '1,2,3'), 'n0 [label="<1>\n' +
            'let a=x+1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n');
    });
});

describe('6.unit testing over while statements', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y;\n' +
            '   let c = 0;\n' +
            '   \n' +
            '   while (a < z) {\n' +
            '       c = a + b;\n' +
            '       a=a+1;\n' +
            '   }\n' +
            '   \n' +
            '   return z;\n' +
            '}\n', '1,2,3'), 'n0 [label="<1>\n' +
            'let a = x + 1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'let b = a + y;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="<3>\n' +
            'let c = 0;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n3 [label="<4>\n' +
            'a < z", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n4 [label="<5>\n' +
            'c = a + b", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n5 [label="<6>\n' +
            'a=a+1", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n6 [label="<7>\n' +
            'return z;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n7 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n6 [label="false"]\n' +
            'n4 -> n5 []\n' +
            'n5 -> n3 []\n' +
            'n6 -> n7 []\n');
    });
});

describe('7.unit testing over while statements', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y;\n' +
            '   let c = 0;\n' +
            '   \n' +
            '   while (a < z) {\n' +
            '       c = a + b;\n' +
            '       a=a+1;\n' +
            '   }\n' +
            '   \n' +
            '   return z;\n' +
            '}\n', '7,4,1'), 'n0 [label="<1>\n' +
            'let a = x + 1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'let b = a + y;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="<3>\n' +
            'let c = 0;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n3 [label="<4>\n' +
            'a < z", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n4 [label="<5>\n' +
            'c = a + b", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n5 [label="<6>\n' +
            'a=a+1", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n6 [label="<7>\n' +
            'return z;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n7 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n6 [label="false"]\n' +
            'n4 -> n5 []\n' +
            'n5 -> n3 []\n' +
            'n6 -> n7 []\n');
    });
});

describe('8.unit testing over if statements', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','1,2,3'),'n0 [label="<1>\n' +
            'let a = x + 1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'let b = a + y;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="<3>\n' +
            'let c = 0;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n3 [label="<4>\n' +
            'b < z", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n4 [label="<5>\n' +
            'c = c + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n5 [label="<6>\n' +
            'return c;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n6 [label="<7>\n' +
            'b < z * 2", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n7 [label="<8>\n' +
            'c = c + x + 5", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n8 [label="<9>\n' +
            'c = c + z + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n9 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n6 [label="false"]\n' +
            'n4 -> n5 []\n' +
            'n5 -> n9 []\n' +
            'n6 -> n7 [label="true"]\n' +
            'n6 -> n8 [label="false"]\n' +
            'n7 -> n5 []\n' +
            'n8 -> n5 []\n');
    });
});

describe('9.unit testing over if statements', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','1,2,21'),'n0 [label="<1>\n' +
            'let a = x + 1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'let b = a + y;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="<3>\n' +
            'let c = 0;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n3 [label="<4>\n' +
            'b < z", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n4 [label="<5>\n' +
            'c = c + 5", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n5 [label="<6>\n' +
            'return c;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n6 [label="<7>\n' +
            'b < z * 2", shape="diamond" style=filled fillcolor="#ffffff"]\n' +
            'n7 [label="<8>\n' +
            'c = c + x + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n8 [label="<9>\n' +
            'c = c + z + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n9 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n6 [label="false"]\n' +
            'n4 -> n5 []\n' +
            'n5 -> n9 []\n' +
            'n6 -> n7 [label="true"]\n' +
            'n6 -> n8 [label="false"]\n' +
            'n7 -> n5 []\n' +
            'n8 -> n5 []\n');
    });
});

describe('10.unit testing over if statements', () => {
    it('is the function make flow chart works correctly', () => {
        assert.deepEqual(makeFlowChart('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','3,7,2'),'n0 [label="<1>\n' +
            'let a = x + 1;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n1 [label="<2>\n' +
            'let b = a + y;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n2 [label="<3>\n' +
            'let c = 0;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n3 [label="<4>\n' +
            'b < z", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n4 [label="<5>\n' +
            'c = c + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n5 [label="<6>\n' +
            'return c;", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n6 [label="<7>\n' +
            'b < z * 2", shape="diamond" style=filled fillcolor="#A9F5BC"]\n' +
            'n7 [label="<8>\n' +
            'c = c + x + 5", shape="box" style=filled fillcolor="#ffffff"]\n' +
            'n8 [label="<9>\n' +
            'c = c + z + 5", shape="box" style=filled fillcolor="#A9F5BC"]\n' +
            'n9 [label="exit", style="rounded"]\n' +
            'n0 -> n1 []\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n6 [label="false"]\n' +
            'n4 -> n5 []\n' +
            'n5 -> n9 []\n' +
            'n6 -> n7 [label="true"]\n' +
            'n6 -> n8 [label="false"]\n' +
            'n7 -> n5 []\n' +
            'n8 -> n5 []\n');
    });
});

