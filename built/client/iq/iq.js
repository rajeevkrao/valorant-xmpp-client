"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatIq = void 0;
const formatIq = (iqData) => {
    const { from, to, type, id, query, ...other } = iqData;
    return {
        type,
        queryType: query?.xmlns,
        query,
    };
};
exports.formatIq = formatIq;
