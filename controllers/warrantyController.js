const {
  WarrantyItem,
  WarrantyAttachment,
  Workflow,
  WorkflowAttachment,
} = require("../models");
const PDFDocument = require("pdfkit");

const getWarrantyItemsData = () => {
  return WarrantyItem.findAll({
    include: [
      {
        model: WarrantyAttachment,
        attributes: ["id", "fileId", "file", "fileName", "fileType"],
      },
      {
        model: Workflow,
        attributes: [
          "id",
          "userId",
          "roleId",
          "dueDate",
          "returnDate",
          "comments",
        ],
        include: [
          {
            model: WorkflowAttachment,
            attributes: ["id", "fileId", "file", "fileName", "fileType"],
          },
        ],
      },
    ],
  });
};

exports.getWarrantyItems = async (req, res) => {
  try {
    const warrantyItems = await getWarrantyItemsData();
    res.json(warrantyItems);
  } catch (error) {
    console.error("Error fetching warranty items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function formatDateToDDMMYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

  return `${day}/${month}/${year}`;
}
exports.getWarrantyItemsPDF = async (req, res) => {
  try {
    // Fetch warranty items with associations
    const warrantyItems = await WarrantyItem.findAll({
      include: [
        {
          model: WarrantyAttachment,
          attributes: ["id", "fileName", "fileType"],
        },
        {
          model: Workflow,
          attributes: ["id", "userId", "dueDate", "returnDate", "comments"],
          include: [
            {
              model: WorkflowAttachment,
              attributes: ["id", "fileName", "fileType"],
            },
          ],
        },
      ],
    });

    // Create a PDF document
    const doc = new PDFDocument({ margin: 30 });

    // Set response headers to trigger download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="WarrantyItems.pdf"'
    );

    // Pipe the PDF to response
    doc.pipe(res);

    // Title
    doc.fontSize(16).text("Warranty Items Report", { align: "left" });
    doc.fontSize(5);

    let legendX = 500;
    let legendY = 20;
    let boxWidth = 15;  // Width of the color box
    let boxHeight = 8;  // Height of the color box
    let textIndent = 20; // Space between color box and text
    let lineSpacing = 15; // Space between legend items
    
    // Warranty Items
    doc.rect(legendX, legendY, boxWidth, boxHeight).fill("#E0AAA9");
    doc.fillColor("black").text("Warranty Items", legendX + textIndent, legendY);
    
    // Warranty Items Attachment
    legendY += lineSpacing;
    doc.rect(legendX, legendY, boxWidth, boxHeight).fill("blue");
    doc.fillColor("black").text("Warranty Item's Attachments", legendX + textIndent, legendY);
    
    // Workflow
    legendY += lineSpacing;
    doc.rect(legendX, legendY, boxWidth, boxHeight).fill("green");
    doc.fillColor("black").text("Workflows", legendX + textIndent, legendY);
    
    // Workflow Attachment
    legendY += lineSpacing;
    doc.rect(legendX, legendY, boxWidth, boxHeight).fill("orange");
    doc.fillColor("black").text("Workflow's Attachments", legendX + textIndent, legendY);



    doc.moveDown(1);

    let height = 100;

    doc.rect(30, height - 5, 550, 20).fill("#E0AAA9");
    doc.rect(30, height - 5, 550, 20).stroke("#E0AAA9");

    doc
      .fillColor("white")
      .fontSize(8)
      .text("Warrany Item ID", 50, height, { bold: true })
      .text("Title", 150, height, { bold: true })
      .text("Company", 300, height, { bold: true })
      .text("Type", 400, height, { bold: true })
      .text("Date", 490, height, { bold: true })
      .text("Status", 530, height, { bold: true });
    height = height + 20;

    // Iterate through each warranty item
    warrantyItems.forEach((item, index) => {
      doc.rect(30, height - 5, 550, 20).stroke("#E0AAA9");

      doc
        .fillColor("black")
        .text(item.id, 50, height)
        .text(item.title, 150, height)
        .text(item.responsibleCompany, 300, height)
        .text(item.warrantyType, 400, height)
        .text(formatDateToDDMMYY(item.warrantySubmittalDate), 490, height)
        .text(item.status, 530, height, { align: "center" });
      height = height + 30;
      if (height >= 750) {
        doc.addPage();
        height = 10;
      }

      // Warranty Attachments Table (Indented)
      if (item.tbl_warranty_attachments.length > 0) {
        doc.rect(50, height - 5, 530, 20).fill("blue");
        doc.rect(50, height - 5, 530, 20).stroke("blue");

        doc
          .fillColor("white")
          .fontSize(8)
          .text("Warranty Attachment ID", 50, height, { indent: 20 })
          .text("FileName", 200, height, { indent: 20 })
          .text("FileType", 300, height, { indent: 20 })
          .text("Status", 500, height, { indent: 20 });

        height = height + 20;
        if (height >= 750) {
          doc.addPage();
          height = 10;
        }

        item.tbl_warranty_attachments.forEach((att) => {
          doc.rect(50, height - 5, 530, 20).stroke("blue");

          doc
            .fillColor("black")
            .fontSize(8)
            .text(att.id, 50, height, { indent: 20 })
            .text(att.fileName, 200, height, { indent: 20 })
            .text(att.fileType, 300, height, { indent: 20 })
            .text(
              att.isCloseoutWarranty == 1 ? "Closed" : "Open",
              500,
              height,
              { indent: 20 }
            );
          height = height + 20;
          if (height >= 750) {
            doc.addPage();
            height = 10;
          }
        });
        height = height + 10;
        if (height >= 750) {
          doc.addPage();
          height = 10;
        }
      }

      //   Workflows Table (Further Indented)
      if (item.tbl_task_workflows.length > 0) {
        doc.rect(50, height - 5, 530, 20).fill("green");
        doc.rect(50, height - 5, 530, 20).stroke("green");

        doc
          .fillColor("white")
          .fontSize(8)
          .text("Workflow ID", 50, height, { indent: 20 })
          .text("CompanyId", 200, height, { indent: 20 })
          .text("UserId", 300, height, { indent: 20 })
          .text("Due Date", 400, height, { indent: 20 })
          .text("Return Date", 500, height, { indent: 20 });

        height = height + 20;
        if (height >= 750) {
          doc.addPage();
          height = 10;
        }

        item.tbl_task_workflows.forEach((workflow) => {
          doc.rect(50, height - 5, 530, 20).stroke("green");
          doc
            .fillColor("black")
            .fontSize(8)
            .text(workflow.id, 50, height, { indent: 20 })
            .text(workflow.companyId, 200, height, { indent: 20 })
            .text(workflow.userId, 300, height, { indent: 20 })
            .text(formatDateToDDMMYY(workflow.dueDate), 400, height, {
              indent: 20,
            })
            .text(
              workflow.returnDate
                ? formatDateToDDMMYY(workflow.returnDate)
                : "",
              500,
              height,
              {
                indent: 20,
              }
            );

          height = height + 30;
          if (height >= 750) {
            doc.addPage();
            height = 10;
          }

          //   Workflow Attachments Table (Most Indented)
          if (workflow.tbl_workflow_attachments.length > 0) {
            doc.rect(90, height - 5, 490, 20).fill("orange");
            doc.rect(90, height - 5, 490, 20).stroke("orange");

            doc
              .fillColor("white")
              .fontSize(8)
              .text("Workflow Attachment ID", 50, height, { indent: 60 })
              .text("File Name", 300, height, { indent: 60 })
              .text("File Type", 440, height, { indent: 60 });

            height = height + 20;
            if (height >= 750) {
              doc.addPage();
              height = 10;
            }

            workflow.tbl_workflow_attachments.forEach((wfatt) => {
              doc.rect(90, height - 5, 490, 20).stroke("orange");

              doc
                .fillColor("black")
                .fontSize(8)
                .text(wfatt.id, 50, height, { indent: 60 })
                .text(wfatt.fileName, 300, height, { indent: 60 })
                .text(wfatt.fileType, 440, height, { indent: 60 });
              height = height + 20;
              if (height >= 750) {
                doc.addPage();
                height = 10;
              }
            });

            height = height + 10;
            if (height >= 750) {
              doc.addPage();
              height = 10;
            }
          }
        });

        height = height + 30;
        if (height >= 750) {
          doc.addPage();
          height = 10;
        }
      }
    });

    // End the PDF stream
    doc.end();
  } catch (error) {
    console.error("Error generating warranty items PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
