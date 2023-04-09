import { customerService } from "../../services";

export async function updateMultipleUsers() {
  const result = await customerService.find(333, 1);
  const listCustomers = result.data.records;

  for (const customer of listCustomers) {
    await customerService.update(customer._id, {
      company: 1,
    });
  }
}
