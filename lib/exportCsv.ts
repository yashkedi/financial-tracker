type Row = Record<string, unknown>;

const escapeCell = (value: unknown): string => {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  return `"${str.replace(/"/g, '""')}"`;
};

const buildCsv = (rows: Row[]): string => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const headerLine = headers.map(escapeCell).join(",");
  const body = rows
    .map((row) => headers.map((key) => escapeCell(row[key])).join(","))
    .join("\n");
  return `${headerLine}\n${body}`;
};

export default function exportCsv(filename: string, rows: Row[]) {
  if (typeof window === "undefined") return;
  if (!rows.length) return;

  const csv = buildCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
