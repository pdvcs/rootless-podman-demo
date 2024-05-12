# Analysing the Layers of our Container Image

We have these images:

```
$ podman images
REPOSITORY                     TAG          IMAGE ID      CREATED         SIZE
localhost/pdutta               node22-demo  84e974d544ea  31 minutes ago  154 MB
docker.io/library/node         22-alpine    471b1db29aec  9 days ago      150 MB
docker.io/library/hello-world  latest       d2c94e258dcb  12 months ago   28.5 kB
```

Let's use `podman image tree` to inspect our container image, `pdutta:node22-demo`:

```
$ podman image tree pdutta:node22-demo
Image ID: 84e974d544ea
Tags:     [localhost/pdutta:node22-demo]
Size:     153.8MB
Image Layers
├── ID: d4fc045c9e3a Size: 7.667MB
├── ID: 11e95db1c5eb Size: 136.8MB
├── ID: 2c3b75742573 Size: 5.603MB
├── ID: a966c78afbb9 Size: 3.584kB Top Layer of: [docker.io/library/node:22-alpine]
├── ID: 6955deafc3a6 Size: 28.67kB
├── ID: 6a4d50272a1b Size: 3.687MB
└── ID: 7832db982a1a Size:  34.3kB Top Layer of: [localhost/pdutta:node22-demo]
```

The `7832db982a1a` layer ("ID: 7832db982a1a Size:  34.3kB Top Layer of: [localhost/pdutta:node22-demo]") should have our JS source code.

With rootless podman, container files are stored in `$HOME/.local/share/containers/storage`.
If you're running as root, it's `/var/lib/containers`.

Let's search for `7832db982a1a` in our container storage:

```
~/.local/share/containers/storage$ sudo find overlay -type d -name '7832db982a1a*'
overlay/7832db982a1a358df26997a0c3707c7bf50924e5d1c3fd4a85c29325efaa7584

~/.local/share/containers/storage$ ls ./overlay/7832db982a1a358df26997a0c3707c7bf50924e5d1c3fd4a85c29325efaa7584/diff/app
Dockerfile  INSTALL.md  package.json  package-lock.json  server.js
```

The `6a4d50272a1b` layer (size: 3.687MB) has the `node_modules` directory -- no surprise, it's much bigger than our JS source code layer.

```
~/.local/share/containers/storage$ ls -1rt ./overlay/6a4d50272a1b6e76d3e280df461aad164a992e473197c3fabf8c3c76aba5f6b0/diff/app/node_modules/
utils-merge
setprototypeof
vary
unpipe
...
```
