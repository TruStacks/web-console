pf:
	kubectl port-forward svc/ts-controller-dev-api 8080:8080

start:
	export NODE_OPTIONS=--openssl-legacy-provider ; npm start
