# Rootless Podman Demo

Running a demo Node 22 + Express app with rootless podman.

First, install and set up rootless podman. Instructions for Ubuntu 22.04
[here](INSTALL.md).


## Build & Run Locally

Run locally:

```shell
npm i
npm start # or...
node server.js
```


## Build & Run with podman

Build: `podman build --tag pdutta:node22-demo -f ./Dockerfile`

Run:

```shell
# run in the foreground
podman run -p 9000:3000 --name node_22_demo --rm pdutta:node22-demo
# ... or in background (-d)
podman run -p 9000:3000 --name node_22_demo -d --rm pdutta:node22-demo
# running this with an allocated terminal isn't useful, so we're not using the -it switch

# if we do need to connect to a shell in the running container, we can `exec -it` like this:
podman exec -it node_22_demo /bin/sh
# (because we have an alpine image, we use /bin/sh not /bin/bash)

# stop the container
podman stop node_22_demo
```

Once the container is running, you can see it running, and the port remapping:

```
$ podman ps
CONTAINER ID  IMAGE                         COMMAND         CREATED        STATUS            PORTS                   NAMES
3ecd73d26793  localhost/pdutta:node22-demo  node server.js  3 minutes ago  Up 3 minutes ago  0.0.0.0:9000->3000/tcp  node_22_demo

$ podman port node_22_demo
3000/tcp -> 0.0.0.0:9000
```

And here's the program output:

```
$ curl http://localhost:9000
[2024-05-11T22:06:28.204Z] Hello World!
```
