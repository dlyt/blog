const _ = require('lodash');
const tools = {};

tools.parseOptions = function (params) {
    params = params || {};
    const ret = { // 解析后的返回结果对象
        where: '',
        values: [],
        order: '',
        limit: '',
        offset: '',
        set: '',
        columns: '*'
    };
    if (params.columns && params.columns.length > 0) {
        ret.columns = params.columns.join(',');
    }

    if (_.isObject(params.set) && Object.keys(params.set).length > 0) {
        ret.set = Object.keys(params.set).join(' = ?, ');
        ret.set += ' = ?';
        ret.values = Object.values(params.set);
    }

    if (_.isObject(params.where) && _.keys(params.where).length > 0) {
        const where = [];

        for (const key in params.where) {
            if (params.where.hasOwnProperty(key)) {
                const values = params.where[key];
                if (_.isArray(values)) { // 如： 值id是数组[1,2,3] 解析为 id in (1,2,3)
                    const val = values.join(',');
                    val.length && where.push(`${key} in (${val})`);
                } else if (_.isObject(values)) {
                    const map = new Map([
                        ['$gt', '>'],
                        ['$lt', '<'],
                        ['$gte', '>='],
                        ['$lte', '<=']
                    ]);
                    for (const _key of Object.keys(values)) {
                        where.push(`${key} ${map.get(_key)} ?`);
                        ret.values.push(values[_key]);
                    };
                } else {
                    where.push(`${key} = ?`);
                    ret.values.push(params.where[key]);
                };
            }
        }

        ret.where = where.length ? 'where ' + where.join(' and ') : '';
    }

    if (Array.isArray(params.order) && params.order.length > 0) {
        const { order } = params;
        ret.order = 'order by';
        for (const arr of order) {
            ret.order += ` ${arr[0]} ${arr[1]}`;
        };
    }

    if (params.limit && !isNaN(params.limit)) {
        ret.limit = ' limit ' + params.limit || '';

        // offset 必须在有limit存在的条件下才成立
        if (ret.limit && params.offset && !isNaN(params.offset)) {
            ret.offset = ' offset ' + params.offset || '';
        }
    }

    return ret;
};

tools.wrapSql = function (sql, val) {
    return {
        sql: sql,
        values: val
    };
};

module.exports = tools;
