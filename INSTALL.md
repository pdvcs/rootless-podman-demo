# Installing rootless podman

## Ubuntu 22.04

```shell
sudo apt install podman
sudo cp /usr/share/containers/containers.conf /etc/containers/
```

In `/etc/containers/containers.conf`, in the `[containers]` section, ensure these settings are set:

```
default_ulimits = [ 
  "nofile=65535:65535",
  "memlock=-1:-1"
]

default_sysctls = [
  "net.ipv4.ping_group_range=0 0",
  "net.ipv4.ip_forward=1"
]
```

Ensure `~/.config/containers/containers.conf` has this:

```
[containers]
default_ulimits = []
```

Set `vm.max_map_count` to 300000: `sudo sysctl -w vm.max_map_count=300000`.
To ensure this setting survives a reboot, ensure `/etc/sysctl.conf` has this:

```
vm.max_map_count=300000
```
