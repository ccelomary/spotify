

const reverseClientId = () => {
    let str = "";
    for (const c of import.meta.env.VITE_CLIENT_ID) {
        str += String.fromCharCode((c.charCodeAt() - 7))
    }
    return str;
}

export default reverseClientId;
