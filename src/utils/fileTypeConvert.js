// The base64 encoded file should be converted to Blob before bing uploaded to server.
export function base64ToBlob(urlData, type) {
  let arr = urlData.split(",");
  // * 和 + 限定符都是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个 ? 就可以实现非贪婪或最小匹配。
  let mime = arr[0].match(/:(.*?);/)[1] || type;
  // 去掉url的头，并转化为byte
  let byteCharacters = atob(arr[1]);
  let sliceSize = 512;
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mime });
  return blob;
}

export function saveBlobtoLocalFile(blobData, localFileName) {
  var file = new File([blobData], { type: "jpeg" });
  const downloadAncher = document.createElement("a");
  downloadAncher.style.display = "none";
  const fileURL = URL.createObjectURL(file);
  downloadAncher.href = fileURL;
  downloadAncher.download = localFileName;
  downloadAncher.click();
}
