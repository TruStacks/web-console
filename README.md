<p><img src="https://i.imgur.com/awXcDpX.png" height="" alt="trustacks logo"/></p>

---

# TruStacks Web-Console

Frontend for the TruStacks SaaS platform.

## Dev Notes

### Port Forwarding the API to the GCM cluster

Run this command in a terminal:
```
kubectl port-forward svc/ts-controller-dev-api 8080:8080
```

The proxy has been configured in `package.json` to http://localhost:8080 to avoid CORS issues with the dev server.

### React Test Server OpenSSL errors

This CRA project might have issues running locally because of OpenSSL support for different versions of Node. This was noted with `v18.4.0`, it might affect other recent versions.

Run this command in a terminal to start the dev server without crashing:
```
export NODE_OPTIONS=--openssl-legacy-provider ; npm start
```

Alternatively, run `make start` to run the react dev server.