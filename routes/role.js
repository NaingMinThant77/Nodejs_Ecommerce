const router = require("express").Router();
const controller = require("../controllers/role")
const { PermitSchema, AllSchema, RoleSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator')

router.route("/")
    .get(controller.all)
    .post([validateBody(PermitSchema.add), controller.add])

router.route("/:id")
    .get([validateParam(AllSchema.id, "id"), controller.get])
    .patch([validateParam(AllSchema.id, "id"), validateBody(PermitSchema.add), controller.patch])
    .delete([validateParam(AllSchema.id, "id"), controller.drop]);

router.post('/add/permit', [validateBody(RoleSchema.addPermit), controller.roleAddPermit])

router.post('/remove/permit', [validateBody(RoleSchema.addPermit), controller.roleRemovePermit])

module.exports = router;