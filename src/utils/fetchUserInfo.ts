export async function fetchUserInfo(options: {
  userId: string;
}): Promise<{ level: number; name: string; exp: number }> {

  let url = new URL("http://127.0.0.1:4523/m1/2536058-0-default/get-user-info")
  url.searchParams.append("userId",options.userId)

  console.log(url);
  
  const resp = await fetch(
    url,
    {
      method: "GET",
    }
  );
  return await resp.json();
}
