import conf from "../Conf";

export const getUserImageUrl = (imagePath?: string) => {
  if (!imagePath) {
    // default profile image
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
  }
  // remove extra slash
  return `${conf.ImageBaseUrl}${conf.UploadUrl}/${imagePath}`;
};
