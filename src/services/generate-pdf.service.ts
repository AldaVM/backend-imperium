import pdf from "pdfjs";
import fs from "fs";

function addRow(name: string, info: string, table: any) {
  const tr = table.row();
  tr.cell(name);
  tr.cell(info, { textAlign: "right" });
}

async function createNewPDF(schemaData: any, filename: string) {
  try {
    const doc = new pdf.Document({
      font: require("pdfjs/font/Helvetica"),
      padding: 20,
    });

    const cell = doc.cell({
      padding: 20,
    });
    cell.text("Imperium Cross", {
      lineHeight: 2,
      fontSize: 28,
      font: require("pdfjs/font/Helvetica"),
      textAlign: "center",
    });

    const table = doc.table({
      widths: [10.5 * pdf.cm, null],
      borderHorizontalWidths: function (i) {
        return i < 2 ? 1 : 0.1;
      },
      padding: 5,
    });

    const tr = table.header({
      font: require("pdfjs/font/Helvetica"),
    });
    tr.cell("Info");
    tr.cell("#", { textAlign: "right" });

    for (const schema of schemaData) {
      addRow(schema.title, schema.value, table);
    }

    doc.pipe(fs.createWriteStream(`${filename}.pdf`));

    await doc.end();
  } catch (error) {
    console.log(error);
  }
}

export { createNewPDF };
