import {
  apiRequest,
  getApplications,
  getToolchainInfo,
  newApplication,
} from "./apiRequests";


beforeEach(() => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({ data: "asdf" }) })
      ) as jest.Mock
    );
});

afterEach(() => {
  jest.restoreAllMocks();
})

describe("apiRequest", () => {
  test("should take a payload and return json", async () => {
    const res = await apiRequest("POST", {
      id: "1",
      method: "",
    });
    // expect(global.fetch).toBeCalledWith("/rpc")
    expect(res).toEqual({ data: "asdf" });
  })
})

describe("getApplications", () => {
  test("should return json", async () => {
    const res = await getApplications();
    // expect(global.fetch).toBeCalledWith("/rpc")
    expect(res).toEqual({ data: "asdf" });
  })
})

describe("getToolchainInfo", () => {
  test("should return json", async () => {
    const res = await getToolchainInfo();
    // expect(global.fetch).toBeCalledWith("/rpc")
    expect(res).toEqual({ data: "asdf" });
  })
})

describe("getToolchainInfo", () => {
  test("should return json", async () => {
    const params = {
      name: "test",
      repository: "www.bestwebsite.com/newproject.git",
      host: "gcm",
      stack: "gke_dev"
    }
    const res = await newApplication(params);
    expect(res).toEqual({ data: "asdf" });
    // expect(global.fetch).toBeCalledWith("/rpc")
  })
})