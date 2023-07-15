export async function SendBinaryData(data: SendOptions): Promise<Response> {
  let options = data.options == null ? {} : data.options;
  options.body = data.body;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", data.body.type);
  options.headers = myHeaders;
  console.log(options);

  const req = new Request(data.url, options);

  return await fetch(req);
}

interface SendOptions {
  url: string;
  body: Blob;
  options?: RequestInit;
}
