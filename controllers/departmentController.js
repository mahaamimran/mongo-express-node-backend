const Department = require('../models/Department');
const Employee = require('../models/Employee');

// Create department
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating department',
      error: error.message
    });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('employees');
    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// Get single department
exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate('employees');
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching department',
      error: error.message
    });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating department',
      error: error.message
    });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }
  
      // Delete all employees in this department
      await Employee.deleteMany({ departmentId: department._id });
      
      // Delete the department
      await Department.findByIdAndDelete(department._id);
  
      res.status(200).json({
        success: true,
        message: 'Department and associated employees deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting department',
        error: error.message
      });
    }
  };
  