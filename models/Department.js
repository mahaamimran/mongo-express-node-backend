const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: [true, 'Department location is required'],
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for employees
DepartmentSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'departmentId'
});

// Pre-remove hook to handle related employees
DepartmentSchema.pre('remove', async function(next) {
  await this.model('Employee').deleteMany({ departmentId: this._id });
  next();
});

module.exports = mongoose.model('Department', DepartmentSchema); 