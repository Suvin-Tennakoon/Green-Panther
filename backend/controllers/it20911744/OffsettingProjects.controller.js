const OffsettingProjectsModel = require('../../models/it20911744/OffsettingProjects.model');


const createOffsettingProject = async(req, res, next) => {
  console.log(req.body);
  try{
    const {
      location,
      description,
      price,
      benifits,
      image
    } = req.body;

    const newOffsettingProject = new OffsettingProjectsModel({
      location,
      description,
      price,
      benifits,
      image
    });

    await newOffsettingProject.save();

    res.status(201).json({
      message: "Offsetting Project Created Successfully",
      project: newOffsettingProject
    });
  }catch(err){
    return res.status(500).json({ message: 'server error', error: err });
  };
}

const getAllOffsettingProjects = async(req, res, next) => {
  try{
    const allOffsettingProjects = await OffsettingProjectsModel.find();
    res.status(200).json({
      message: "All Offsetting Projects",
      projects: allOffsettingProjects
    });
  }catch(err){
    return res.status(500).json({ message: 'server error', error: err });
  };
}

const getSingleOffsettingProject = async(req, res, next) => {
  try{
    const singleOffsettingProject = await OffsettingProjectsModel.findById(req.params.id);
    res.status(200).json({
      message: "Single Offsetting Project",
      project: singleOffsettingProject
    });
  }catch(err){
    return res.status(500).json({ message: 'server error', error: err });
  };
}

const updateOffsettingProject = async(req, res, next) => {
  try{
    const {
      location,
      description,
      price,
      benifits,
      image
    } = req.body;

    const updatedOffsettingProject = await OffsettingProjectsModel.findByIdAndUpdate(req.params.id, {
      location,
      description,
      price,
      benifits,
      image
    },{new: true});
    res.status(200).json({
      message: "Offsetting Project Updated Successfully",
      project: updatedOffsettingProject
    });
  }catch(err){
    return res.status(500).json({ message: 'server error', error: err });
  };
}

const deleteOffsettingProject = async(req, res, next) => {
  try{
    const deletedOffsettingProject = await OffsettingProjectsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Offsetting Project Deleted Successfully",
      project: deletedOffsettingProject
    });
  }catch(err){
    return res.status(500).json({ message: 'server error', error: err });
  };
}

module.exports = {
  createOffsettingProject,
  getAllOffsettingProjects,
  getSingleOffsettingProject,
  updateOffsettingProject,
  deleteOffsettingProject
}