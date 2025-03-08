module.exports = (sequelize, Sequelize) => {
    const taskWorkflows = sequelize.define("tbl_task_workflows", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        companyId: {
            type: Sequelize.BIGINT
        },
        warrantyItemId: {
            type: Sequelize.BIGINT
        },
        userId: {
            type: Sequelize.BIGINT
        },
        roleId: {
            type: Sequelize.INTEGER
        },
        dueDate: {
            type: Sequelize.DATE
        },
        returnDate: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return taskWorkflows;
};