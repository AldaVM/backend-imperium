const Excel = require("exceljs");

function buildXLSX(data: {}[], nameSheet: string, columns: {}[]) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(nameSheet);

  worksheet.columns = columns;
  worksheet.addRows(data);

  return workbook;
}

export default buildXLSX;
