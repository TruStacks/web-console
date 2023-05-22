type ApiRequestParams = {
  id: string;
  token?: string;
  method: string;
  param?: {
    [key: string]: string[];
  };
};

async function apiRequest(method: string, body: ApiRequestParams) {
  const req = await fetch("/rpc", {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await req.json();
  return json;
}

export async function getApplications() {
  const body: ApiRequestParams = {
    id: "1",
    method: "v1.GetApplications",
    // param: { name: ["dev"] },
  };
  const apps = await apiRequest("POST", body);
  console.log(apps);
  return apps;
}

export async function getToolchainInfo() {
  const body: ApiRequestParams = {
    id: "1",
    method: "v1.GetToolchainInfo",
    param: { name: ["dev"] },
  };
  const toolchain = await apiRequest("POST", body);
  return toolchain;
}

export default apiRequest;
