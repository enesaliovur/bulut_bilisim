export interface UploadImageRequestDTO {
  title: string,
  base64Image: string,
  password?: string,
  adminPassword?: string,
}