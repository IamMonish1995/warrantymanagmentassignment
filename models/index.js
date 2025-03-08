const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const WarrantyItem = require("./warrantyItem")(sequelize, Sequelize);
const WarrantyAttachment = require("./warrantyAttachment")(sequelize, Sequelize);
const Workflow = require("./workflow")(sequelize, Sequelize);
const WorkflowAttachment = require("./workflowAttachment")(sequelize, Sequelize);

// Associations
WarrantyItem.hasMany(WarrantyAttachment, { foreignKey: "fileId" });

WarrantyItem.hasMany(Workflow, { foreignKey: "warrantyItemId" });

Workflow.hasMany(WorkflowAttachment, { foreignKey: "fileId" });
// WorkflowAttachment.belongsTo(Workflow, { foreignKey: "fileId" });

module.exports = {
    sequelize,
    WarrantyItem,
    WarrantyAttachment,
    Workflow,
    WorkflowAttachment,
};
