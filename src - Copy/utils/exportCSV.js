import { saveAs } from "file-saver";

export function exportCSV(filename, users) {
  if (!users || users.length === 0) {
    alert("Tidak ada data.");
    return;
  }

  const csv =
    "Username\n" +
    users.map((u) => `"${u}"`).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `${filename}.csv`);
}