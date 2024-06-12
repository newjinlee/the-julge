// uploadImageToS3.ts

async function uploadImageToS3(presignedUrl: string, file: File): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to S3');
  }
}

export default uploadImageToS3;
