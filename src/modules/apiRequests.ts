type ApiRequestParams = {
  id: string;
  token?: string;
  method: string;
  param?: {[key: string] : string[]}
  params?: {
    [key: string]: string;
  };
};

export async function apiRequest(method: string, body: ApiRequestParams) {
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
  };
  const apps = await apiRequest("POST", body);
  return apps;
}

export async function getToolchainInfo() {
  const body: ApiRequestParams = {
    id: "1",
    method: "v1.GetToolchainInfo",
    // params: { name: ["dev"] },
  };
  const toolchain = await apiRequest("POST", body);
  return toolchain;
}

export type NewApplicationParams = {
  name: string,
  repository: string,
  host: string,
  stack: string
}

export async function newApplication(params: NewApplicationParams) {
  const {name, repository, host, stack} = params
  const body: ApiRequestParams = {
    id: "1",
    method: "v1.NewApplication",
    params: {name, repository, host, stack}
  }
  const newApp = await apiRequest("POST", body)
  return newApp
}