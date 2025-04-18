var express = require('express');
var router = express.Router();
var roleController = require('../controllers/roles')
let { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let constants = require('../utils/constants');

/* GET users listing. */
router.get('/', async function (req, res, next) {
   let roles = await roleController.GetAllRoles();
   CreateSuccessRes(res, roles, 200);
});

router.post('/', check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
   try {
      let newRole = await roleController.CreateARole(req.body.name);
      CreateSuccessRes(res, newRole, 200);
   } catch (error) {
      next(error)
   }
});

router.put('/:id',check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
   try {
      let updatedRole = await roleController.UpdateARole(req.params.id, req.body.name);
      CreateSuccessRes(res, updatedRole, 200);
   }
   catch (error) {
      next(error)
   }
});

router.delete('/:id',check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
   try {
      let deletedRole = await roleController.DeleteARole(req.params.id);
      CreateSuccessRes(res, deletedRole, 200);
   }
   catch (error) {
      next(error)
   }
});


module.exports = router;
