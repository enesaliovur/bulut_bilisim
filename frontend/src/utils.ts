import { ImageModel } from './@types/image-model';

export const getBase64 = async (file: Blob): Promise<string | undefined> => {
  var reader = new FileReader();
  reader.readAsDataURL(file as Blob);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result as any);
    reader.onerror = (error) => reject(error);
  })
}

export const getBase64FromUrl = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const getShareImageLink = (image: ImageModel) => {
  let baseUrl = new URLSearchParams(`${window.location.origin}?id=${image.id}`);
  console.log(baseUrl);
  if (image.password) {
    baseUrl.append('password', image.password);
  }
  return decodeURIComponent(baseUrl.toString());
}

export const getManageImageLink = (image: ImageModel) => {
  let baseUrl = new URLSearchParams(`${window.location.origin}/manage?id=${image.id}`);
  if (image.adminPassword) {
    baseUrl.set('adminPassword', image.adminPassword);
  }
  if (image.password) {
    baseUrl.set('password', image.password);
  }
  return decodeURIComponent(baseUrl.toString());

}