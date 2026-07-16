export const QUICK_CHECK_MAX_DOCUMENTS = 8;
export const QUICK_CHECK_MAX_DOCUMENT_SIZE = 15 * 1024 * 1024;
export const QUICK_CHECK_MAX_DOCUMENT_TOTAL_SIZE = 20 * 1024 * 1024;

export function isQuickCheckDocumentAllowed(file: {name: string; type: string}) {
  return (
    file.type === 'application/pdf' ||
    file.type.startsWith('image/') ||
    /\.(pdf|png|jpe?g|webp)$/i.test(file.name)
  );
}
