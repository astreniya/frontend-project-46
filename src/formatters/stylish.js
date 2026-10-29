import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) {
        return String(value);
    }
    const currentIndent = indent(depth + 1);
    const bracketIndent = ' '.repeat(depth * 4);
    const lines = Object.entries(value).map(
        ([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`
    );
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const stylish = (tree) => {
    const iter = (currentAST, depth) => {
        const lines = currentAST.map((node) => {
            switch (node.type) {
                case 'nested':
                    return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${' '.repeat(depth * 4)}}`;
                case 'added':
                    return `${indent(depth)}+ ${node.key}: ${stringify(node.val, depth)}`;
                case 'deleted':
                    return `${indent(depth)}- ${node.key}: ${stringify(node.val, depth)}`;
                case 'changed':
                    return [
                        `${indent(depth)}- ${node.key}: ${stringify(node.val1, depth)}`,
                        `${indent(depth)}+ ${node.key}: ${stringify(node.val2, depth)}`
                    ].join('\n');
                case 'unchanged':
                    return `${indent(depth)}  ${node.key}: ${stringify(node.val, depth)}`;
                default:
                    throw new Error(`Unknown type: ${node.type}`);
            }
        });
        return lines.join('\n');
    };

    return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
