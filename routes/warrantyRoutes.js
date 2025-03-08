const express = require("express");
const { getWarrantyItems, getWarrantyItemsPDF } = require("../controllers/warrantyController");
const router = express.Router();

/**
 * @swagger
 * /api/warrantyitems:
 *   get:
 *     summary: Get all warranty items
 *     tags: [WarrantyItem]
 *     responses:
 *       200:
 *         description: A list of warranty items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   companyId:
 *                     type: string
 *                     example: "1"
 *                   warrantyAutoId:
 *                     type: string
 *                     example: "25"
 *                   divisionId:
 *                     type: string
 *                     example: "0"
 *                   projectId:
 *                     type: string
 *                     example: "100"
 *                   status:
 *                     type: integer
 *                     example: 5
 *                   responsibleCompany:
 *                     type: string
 *                     example: "HSM Contech"
 *                   createdById:
 *                     type: string
 *                     example: "100"
 *                   distribution:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   title:
 *                     type: string
 *                     example: "testwarranty61"
 *                   description:
 *                     type: string
 *                     example: "test"
 *                   warrantySubmittalDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-08T00:00:00.000Z"
 *                   warrantyType:
 *                     type: string
 *                     example: "Workmanship"
 *                   isDeleted:
 *                     type: integer
 *                     example: 0
 *                   closedBy:
 *                     type: string
 *                     example: "0"
 *                   deletedBy:
 *                     type: string
 *                     example: "0"
 *                   closedComment:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   customValues:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: integer
 *                           example: 1
 *                         index:
 *                           type: integer
 *                           example: 0
 *                         values:
 *                           type: string
 *                           example: "1 year"
 *                         colName:
 *                           type: string
 *                           example: "Project_Deadline"
 *                         dropDown:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["2 days", "1 month", "1 year"]
 *                         displayName:
 *                           type: string
 *                           example: "Project Deadline"
 *                   closedDateTime:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: null
 *                   scanWarranty:
 *                     type: integer
 *                     example: 0
 *                   closeoutItemId:
 *                     type: string
 *                     example: "30902"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-08T13:30:35.131Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-21T06:22:08.885Z"
 *       500:
 *         description: Internal Server Error
 */

router.get("/warrantyitems", getWarrantyItems);

/**
 * @swagger
 * /api/warrantyitemsPDF:
 *   get:
 *     summary: Generate a PDF of all warranty items
 *     tags: [WarrantyItem]
 *     responses:
 *       200:
 *         description: PDF file containing warranty items
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal Server Error
 */

router.get("/warrantyitemsPDF", getWarrantyItemsPDF);

module.exports = router;
