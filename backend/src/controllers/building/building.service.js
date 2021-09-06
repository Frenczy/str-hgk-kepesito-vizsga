const Model = require('../../models/building.model');

exports.findAll = () => Model.find().populate('classrooms');
exports.findOne = id => Model.findById(id).populate('classrooms');

// check if populate
exports.update = (buildingId, className) => Model.findByIdAndUpdate(buildingId, className, { new: true });
