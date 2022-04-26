import { ImageModel } from './@types/image-model';

export const getBase64 = async (file: Blob): Promise<string | undefined> => {
  var reader = new FileReader();
  reader.readAsDataURL(file as Blob);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result as any);
    reader.onerror = (error) => reject(error);
  })
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

let getImageBlob = function (url: string): Promise<Blob> {
  return new Promise(async resolve => {
    let resposne = await fetch(url);
    let blob = resposne.blob();
    resolve(blob);
  });
};

// convert a blob to base64
let blobToBase64 = function (blob: Blob) {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.onload = function () {
      let dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  });
}

export const getBase64FromUrl = async function (url: string) {
  let blob = await getImageBlob(url);
  blob = blob.slice(0, blob.size, "image/png")
  let base64 = await blobToBase64(blob);
  return base64;
}