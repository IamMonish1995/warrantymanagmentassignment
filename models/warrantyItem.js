module.exports = (sequelize, Sequelize) => {
  const WarrantyItems = sequelize.define("tbl_warranty_items", {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
      },
      companyId: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      warrantyAutoId: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      divisionId: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      projectId: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      status: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      responsibleCompany: {
          type: Sequelize.STRING,
      },
      createdById: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      distribution: {
          type: Sequelize.STRING,
      },
      title: {
          type: Sequelize.STRING,
      },
      description: {
          type: Sequelize.TEXT,
      },
      warrantySubmittalDate: {
          type: Sequelize.DATE,
      },
      warrantyType: {
          type: Sequelize.STRING,
      },
      isDeleted: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      closedBy: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      deletedBy: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      closedComment: {
          type: Sequelize.TEXT,
      },
      customValues: {
          type: Sequelize.JSONB,
      },
      closedDateTime: {
          type: Sequelize.DATE,
      },
      scanWarranty: {
          type: Sequelize.INTEGER,
      },
      closeoutItemId: {
          type: Sequelize.BIGINT,
      }
  });
  return WarrantyItems;
};