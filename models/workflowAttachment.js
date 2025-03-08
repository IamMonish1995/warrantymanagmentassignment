module.exports = (sequelize, Sequelize) => {
    const workflowAttachments = sequelize.define("tbl_workflow_attachments", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fileId: {
            type: Sequelize.BIGINT
        },
        file: {
            type: Sequelize.STRING
        },
        fileName: {
            type: Sequelize.STRING
        },
        fileType: {
            type: Sequelize.STRING
        }
    });
    return workflowAttachments;
};