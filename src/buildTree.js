import _ from 'lodash';

const buildTree = (obj1, obj2) => {
    const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

    return keys.map((key) => {
        if (!_.has(obj1, key)) {
            return { key, type: 'added', val: obj2[key] };
        }
        if (!_.has(obj2, key)) {
            return { key, type: 'deleted', val: obj1[key] };
        }
        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
            return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
        }
        if (!_.isEqual(obj1[key], obj2[key])) {
            return { key, type: 'changed', val1: obj1[key], val2: obj2[key] };
        }
        return { key, type: 'unchanged', val: obj1[key] };
    });
};

export default buildTree;
