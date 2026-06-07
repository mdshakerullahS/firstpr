export const DATE = "\\d{4}-\\d{2}-\\d{2}";
export const NUMBER = "\\d+";

export const formatRegex = `^([<>]=?)?((?:${DATE})|(?:${NUMBER}))(?:\.\.((?:${DATE})|(?:${NUMBER})))?$`;

export function parseDateValue(val: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

  const diff = Number(val);

  if (Number.isNaN(diff)) {
    throw new Error("Invalid numeric date diff");
  }

  const date = new Date();
  date.setUTCDate(date.getUTCDate() - diff);

  return date.toISOString().split("T")[0];
}

export function isFutureDate(dateStr: string): boolean {
  const target = new Date(`${dateStr}T00:00:00Z`);
  const today = new Date();

  today.setUTCHours(0, 0, 0, 0);

  return target > today;
}

export function validateUpdated(updated: string): void {
  const regex = new RegExp(
    `^([<>]=?)?((?:${DATE})|(?:${NUMBER}))(?:\\.\\.((?:${DATE})|(?:${NUMBER})))?$`,
  );

  if (!regex.test(updated)) {
    throw new Error("Invalid updated format");
  }
}

export function validateComments(comments: string): void {
  if (!/^([<>]=?\d+|\d+\.\.\d+|\d+)$/.test(comments)) {
    throw new Error("Invalid comments format");
  }
}
