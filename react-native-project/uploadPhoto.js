import { storage } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhotoToServer = async (image) => {
  const response = await fetch(image);
  const file = await response.blob();

  const uniquePostId = Date.now().toString();

  const pathPhoto = `userImage/${uniquePostId}.jpg`;

  const photoRef = ref(storage, pathPhoto);

  const uploadPhoto = await uploadBytes(photoRef, file, {
    contentType: "image/jpeg",
  });

  const processedPhoto = await getDownloadURL(uploadPhoto.ref);
  return processedPhoto;
};
