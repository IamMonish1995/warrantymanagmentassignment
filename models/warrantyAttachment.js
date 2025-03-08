module.exports = (sequelize, Sequelize) => {
    const warrantyAttachments = sequelize.define("tbl_warranty_attachments", {
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
        },
        attachmentId: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        isCloseoutWarranty: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return warrantyAttachments;
};