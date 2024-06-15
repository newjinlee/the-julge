// getImageUrlWithoutQueryParams.ts

function getImageUrlWithoutQueryParams(presignedUrl: string): string {
  const url = new URL(presignedUrl);
  return `${url.origin}${url.pathname}`;
}

export default getImageUrlWithoutQueryParams;
