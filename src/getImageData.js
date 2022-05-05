const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

function getImageData (buffer) {
    let temp = 'data:image/jpeg;base64,' + arrayBufferToBase64(buffer)
    return temp
}

export default getImageData