const { WarrantyItem, WarrantyAttachment, Workflow, WorkflowAttachment } = require("../models");
const PDFDocument = require("pdfkit");

exports.getWarrantyItems = async (req, res) => {
    try {
        const warrantyItems = await WarrantyItem.findAll(
            
        //     {
        //     include: [
        //         {
        //             model: WarrantyAttachment,
        //             attributes: ["id", "fileId", "file", "fileName", "fileType"],
        //         },
        //         {
        //             model: Workflow,
        //             attributes: ["id", "userId", "roleId", "dueDate", "returnDate", "comments"],
        //             include: [
        //                 {
        //                     model: WorkflowAttachment,
        //                     attributes: ["id", "fileId", "file", "fileName", "fileType"],
        //                 }
        //             ]
        //         }
        //     ]
        // }
    
    );

        res.json(warrantyItems);
    } catch (error) {
        console.error("Error fetching warranty items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getWarrantyItemsPDF = async (req, res) => {
    try {
        const warrantyItems = await WarrantyItem.findAll();

        if (!warrantyItems || warrantyItems.length === 0) {
            return res.status(404).json({ error: "No warranty items found" });
        }

        // Set response headers to force download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="warrantyItems.pdf"');

        // Create a PDF document
        const doc = new PDFDocument({ margin: 30 });

        // Pipe the PDF directly to the response
        doc.pipe(res);

        // PDF Title
        doc.fontSize(18).text("Warranty Items Report", { align: "center" });
        doc.moveDown(1);

        // Table Header
        doc
            .fontSize(12)
            .text("ID", 50, doc.y, { bold: true })
            .text("Title", 100, doc.y, { bold: true })
            .text("Company", 250, doc.y, { bold: true })
            .text("Status", 400, doc.y, { bold: true });

        doc.moveDown(0.5);
        doc.text("-------------------------------------------------------------", 50, doc.y);

        // Table Content
        warrantyItems.forEach((item) => {
            doc
                .moveDown(0.5)
                .fontSize(10)
                .text(item.id, 50, doc.y)
                .text(item.title, 100, doc.y)
                .text(item.responsibleCompany, 250, doc.y)
                .text(item.status.toString(), 400, doc.y);
        });

        // Finalize the PDF and send response
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};