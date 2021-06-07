'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mapDataToHash = data => data.reduce((acc, item) => {
  acc[item._id.toString()] = item; // eslint-disable-line no-underscore-dangle
  return acc;
}, {});

const loader = exports.loader = async (model, ids, projection) => {
  const data = projection && typeof projection !== 'undefined' && Object.keys(projection).length > 0 ? await model.find({ _id: { $in: ids } }).select(projection).lean() : await model.find({ _id: { $in: ids } }).lean();

  const hash = mapDataToHash(data);
  return ids.map(id => {
    if (hash[id.toString()]) {
      return hash[id.toString()];
    }
    return null;
  });
};

exports.default = loader;