module.exports = {
  find: (model) => model.find({}).sort({ created: -1 }),

  findById: (model, id) => model.findOne({ _id: id }),

  findByEmail: (model, email) => model.findOne({ email: email }),
};
