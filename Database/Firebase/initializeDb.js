import admin from 'firebase-admin'

const serviceAccount = {
    type: "service_account",
    project_id: "basedeprueba-8e5c0",
    private_key_id: "c2aa4f2acd986d8cbb9a3488957cf5f78aabfc92",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCljiFSrOXyOGMT\n4uoefPfZ2it6LwjpxbOs4JyktjX+JEApeL8/vOEgL7PsNuJEP4O9k2xhJN1iY8iQ\nolu9fHfy2ccEm9RsjaMtswo4U5S7Nb3KIPAtsNQt73wmT4rW4kGsgUpNO4IqkPbX\nbvb6ME60vHtmio6FRKvAx6sZARNc3b+eQJ5FqezhvBHwiPU11h+C2ZdATy16WRyA\nJQicM7ULcj31l+MDI+djy1Yh0xvHjaRvoTRzzTnObDbPP8fRWLk1TWbof8zONA9i\ncCAd2eyFJZ0Fsr5pnh10nCUpQ4IRDafScAlqzpy90/wBHzBVUZu/5VZevgkZzruZ\nmPcyxPTHAgMBAAECggEAC8LGC+kryKzyyjszezOmKSa+MfGHcOani0oa4U9Eaf0f\nRb2bMHxK2I4q+kaH2mX8sN9OiAl7ZKhGsOenxr/shtGruWBskxhDawADY4RPK4wi\nIxV7RR5WZGZVQSTOGH0oQd30GPp3lm3dQJP/HZTdnSn1RjqPl1i32XvAZDKsXSC8\n/gWjjmvZ7mVachWiCb5rRBkr62EWmjLpI/eoCU9Arh940CYPD+Jfb1G3IkXi5qKL\n6O4qsiem4skoy2N3dwEUdHPqPXawHYnViBz6ELsvvISc60ROPssKxxnrHVNCCD1J\np0DZvIhj1Fv+BcTNB33RSA4asYUGaGdU9XTNBK9YMQKBgQDbXDiVTJ5nA1UhcJUT\nnlBH74/Fc1S4M1x6svHHT0ygYbQCp9jAwOm1uwn55iH+VXJfiTs3VVtUPcEeIl2a\n/cLM4+xiAX8Xd97n77DV2K/MARrAm67IwauhMjZcMq1M++Pyn1BY9XqiOa/pyAyU\n3X+8AhPyAXyT1VnHQWHScUbITwKBgQDBNTivUqH3M4GGbLP2J5Afw0k7ZmQWs957\nCugR1JNkNU83h80k0+/Hg9nXVLD+2CyKq5hSejLcgUBRHdk9GFNmit/yChaZD8Ti\nIZO/xkvYR4msTqy48frwtqNSV+lBHaGx3ulO1fN+Wf6DNy0ai3CwL1go+x6sfLj9\nZHQ54XT2CQKBgQC/Kt1872rUZ4kXPWAN2tgn+NSYxOu+I7SikbQ3eBpVYxBXiCNT\nyEtkvv3wtOhHF/w22gerL04KWk8kjdp5qlDL8o4c0yUJNMQj6TV5CAAcj5Ha7VIj\nTvTd5D6PlvKEtrhuxvxkqnoXSqLN4DNmwKoDFOSA8V66DyLQjWBM379J7QKBgQCx\n7NI72swfO4Z/haGhAUQfjBbnpd5sbc5n315h9TKa6OD/0Ybg8G/ze3/kZjDtL6St\nO2L2KWSnXjwdt3A0bC950lBztEilQjlcyfEnfXShQxgM3xL+6pDelkMHdL/w4Fnk\n1NRkbnFjHXtd2TUnKdxn0+HLM59G10EA0T6bgv3UCQKBgQCPTTxpDgiIEAF2/LYF\nVgqckYFNXGCVgYEOTDRBEYz5JTN82G9lQEzUL4dBXVTyKqsFAK1rMP81swqaC7Cf\nNtWmRclcPwRWI3cMJOSdCuvLpt67VqqdjlwdJjJ7guqNpciDHwJApEI/Y77vqaxW\nQX3S2TYXS9uH7oYIS1eSFrCTHg==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-17cdn@basedeprueba-8e5c0.iam.gserviceaccount.com",
    client_id: "115959207806734582680",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-17cdn%40basedeprueba-8e5c0.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://basedeprueba-8e5c0.firebaseio.com"
});

const db = admin.firestore()
export default db