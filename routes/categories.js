var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categories');
let { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

/* GET all categories */
router.get('/', async function (req, res, next) {
    try {
        let categories = await categoryModel.find({ isDeleted: false });
        CreateSuccessRes(res, categories, 200);
    } catch (error) {
        next(error);
    }
});

/* GET category by ID */
router.get('/:id', async function (req, res, next) {
    try {
        let category = await categoryModel.findOne({ _id: req.params.id, isDeleted: false });
        if (!category) return CreateErrorRes(res, "Category not found", 404);
        CreateSuccessRes(res, category, 200);
    } catch (error) {
        next(error);
    }
});

/* CREATE new category */
router.post('/', async function (req, res, next) {
    try {
        let { name, description } = req.body;

        let newCategory = new categoryModel({ name, description });
        await newCategory.save();

        CreateSuccessRes(res, newCategory, 200);
    } catch (error) {
        next(error);
    }
});

/* UPDATE category */
router.put('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let { name, description } = req.body;
        let updatedInfo = {};

        if (name) updatedInfo.name = name;
        if (description) updatedInfo.description = description;

        let updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedInfo, { new: true });
        if (!updatedCategory) return CreateErrorRes(res, "Category not found", 404);

        CreateSuccessRes(res, updatedCategory, 200);
    } catch (error) {
        next(error);
    }
});

/* DELETE category (soft delete) */
router.delete('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        let deletedCategory = await categoryModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedCategory) return CreateErrorRes(res, "Category not found", 404);

        CreateSuccessRes(res, deletedCategory, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;