type ApiRequestParams = {
  id: string,
  token?: string,
  params?: {
    key: string
  }

}

async function apiRequest () {
  const req = await fetch("/rpc", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: 1,
      method: "v1.GetToolchainInfo",
      params: [
        "dev"
      ]
    })
  })
  const json = await req.json()
  return json
}

export default apiRequest