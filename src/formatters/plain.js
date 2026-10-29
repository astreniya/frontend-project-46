import _ from 'lodash';

const stringify = (value) => {
    if (_.isPlainObject(value) || _.isArray(value)) {
        return '[complex value]';
    }
    if (typeof value === 'string') {
        return `'${value}'`;
    }
    return String(value);
};

const plain = (tree) => {
    const iter = (currentAST, keysAccumulator) => {
        const lines = currentAST.map((node) => {
            const currentPath = [...keysAccumulator, node.key].join('.');

            switch (node.type) {
                case 'nested':
                    return iter(node.children, [...keysAccumulator, node.key]);
                case 'added':
                    return `Property '${currentPath}' was added with value: ${stringify(node.val)}`;
                case 'deleted':
                    return `Property '${currentPath}' was removed`;
                case 'changed':
                    return `Property '${currentPath}' was updated. From ${stringify(node.val1)} to ${stringify(node.val2)}`;
                case 'unchanged':
                    return null;
                default:
                    throw new Error(`Unknown type: ${node.type}`);
            }
        });

        return _.compact(lines).join('\n');
    };

    return iter(tree, []);
};

export default plain;
