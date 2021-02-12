import pdf from "pdfjs";
import fs from "fs";

function addRow(name: string, info: string, table: any) {
  const tr = table.row();
  tr.cell(name);
  tr.cell(info, { textAlign: "right" });
}

async function createNewPDF(
  voucherInfo = {
    _id: "4545454587ddsds",
    customer: {
      names: "Usuario de prueba",
      surnames: "Usuario de prueba",
      dni: "12345678",
    },
    rate: 0,
    amount_paid: 0,
    date_init: "2021-01-04T00:00:00.000Z",
    date_expiration: "2021-02-04T00:00:00.000Z",
    turn_detail: "INTERDIARIO",
    type_modality: "MENSUAL",
    residue: 0,
  }
) {
  try {
    console.log(voucherInfo);

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

    addRow("Número RUC:", "20602696660", table);
    addRow("Razón Social:", "Imperium Cross SAC", table);
    addRow(
      "Nombre del Cliente:",
      `${voucherInfo.customer.names} ${voucherInfo.customer.surnames}`,
      table
    );
    addRow("DNI del Cliente:", `${voucherInfo.customer.dni}`, table);
    addRow("Turno:", `${voucherInfo.turn_detail}`, table);
    addRow("Modalidad:", `${voucherInfo.type_modality}`, table);
    addRow("Inicio de Inscripción:", `${voucherInfo.date_init}`, table);
    addRow("Fin de Expiración:", `${voucherInfo.date_expiration}`, table);
    addRow("Monto a pagar:", `${voucherInfo.rate}`, table);
    addRow("Monto pagado:", `${voucherInfo.amount_paid}`, table);
    addRow("Monto pendiente:", `${voucherInfo.residue}`, table);

    doc.pipe(fs.createWriteStream(`${voucherInfo._id}.pdf`));

    await doc.end();
  } catch (error) {
    console.log(error);
  }
}

export default createNewPDF;
