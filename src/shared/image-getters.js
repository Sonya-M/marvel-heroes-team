// 200x200px
export const getStandardImg = (obj) => {
  if (!obj.thumbnail) return "";
  return obj.thumbnail.path + "/standard_xlarge." + obj.thumbnail.extension;
}

// 150x225px
export const getPortrait = (obj) => {
  if (!obj.thumbnail) return "";
  return obj.thumbnail.path + "/portrait_xlarge." + this.thumbnail.extension;
}

// 100x100px
export const getStandardMediumImg = (obj) => {
  if (!obj.thumbnail) return "";
  return obj.thumbnail.path + "/standard_medium." + obj.thumbnail.extension;
}

//140x140px
export const getStandardLargeImg = (obj) => {
  if (!obj.thumbnail) return "";
  return obj.thumbnail.path + "/standard_medium." + obj.thumbnail.extension;
}