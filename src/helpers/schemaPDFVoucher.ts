function createSchemaPDFVoucher(voucher: any) {
  const schemaVoucher = [
    {
      title: "Número RUC:",
      value: "20602696660",
    },
    {
      title: "Razón Social:",
      value: "Imperium Cross SAC",
    },
  ];

  for (const key in voucher) {
    if (key === "customer") {
      if (Object.keys(voucher[key]).length > 0) {
        schemaVoucher.push({
          title: "Nombre del Cliente:",
          value: `${voucher[key].names} ${voucher[key].surnames}`,
        });
        schemaVoucher.push({
          title: "DNI del Cliente:",
          value: voucher[key].dni,
        });
      }
    }
    if (key === "turn_detail") {
      schemaVoucher.push({
        title: "Turno",
        value: voucher[key],
      });
    }
    if (key === "type_modality") {
      schemaVoucher.push({
        title: "Modalidad:",
        value: voucher[key],
      });
    }
    if (key === "date_init") {
      schemaVoucher.push({
        title: "Inicio de Inscripción:",
        value: `${new Date(voucher[key])}`,
      });
    }
    if (key === "date_expiration") {
      schemaVoucher.push({
        title: "Fin de Expiración:",
        value: `${new Date(voucher[key])}`,
      });
    }
    if (key === "rate") {
      schemaVoucher.push({
        title: "Monto a pagar:",
        value: `${voucher[key]}`,
      });
    }
    if (key === "amount_paid") {
      schemaVoucher.push({
        title: "Monto pagado:",
        value: `${voucher[key]}`,
      });
    }
    if (key === "residue") {
      schemaVoucher.push({
        title: "Monto pendiente:",
        value: `${voucher[key]}`,
      });
    }
  }
  return schemaVoucher;
}

export default createSchemaPDFVoucher;
