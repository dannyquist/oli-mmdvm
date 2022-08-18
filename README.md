# Oli MMDVM

Oli-MMDVM seeks to be an simple front-end for using the MMDVMHost daemon. Currently, OliMMDVM 
only supports DMR, and has only been tested using the TGIF and Brandmeister networks.

Current functionality is limited to DMR networks, but others will be added soon.

![img.png](assets/olimmdvm-screenshot.png)

## Recommended Hardware

1. Raspberry Pi 3/4 or similar SBC.
2. [MMDVM Hotspot Dual Antenna Board Duplex](https://www.amazon.com/gp/product/B07XBZYHFC) (no affiliate link)
3. A case of your choosing

## Hardware Prerequisites

You will need to patch the firmware for the MMDVM board, provided you bought from the above link.
To do this, you need to follow the terrible instructions included in the package. [Toshen, KE0FHS has 
written a comprehensive guide on how to update the firmware](https://amateurradionotes.com/firmware.htm).

The key thing is to remember to short the JP1 board and keep it shorted until the update is done.

![img.png](assets/mmdvm-jp1-callout.png)

## OS Configuration

tl;dr Set up Raspberry Pi OS normally with network access, disable the serial terminal, install docker + docker-compose.

Update the base system

```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

Install Docker using the [Simplilearn tutorial](https://www.simplilearn.com/tutorials/docker-tutorial/raspberry-pi-docker)

Install docker-compose 
```bash
sudo apt install python3 python3-pip -y
sudo pip3 install docker-compose
```

Disable the serial console
   1. `sudo raspi-config`
   2. Interface Options -> Serial Port
   3. **NO** login shell over serial port (the MMDVM needs it)
   4. **YES** Serial port hardware enabled
   5. Finish

Add user to the dialout group

```bash
sudo usermod -aG dialout ${USER}
```

## Installation

Run the following commands:
```bash
curl https://raw.githubusercontent.com/dannyquist/oli-mmdvm/main/docker-compose.yml -o docker-compose.yml
docker-compose up -d && docker-compose logs -f 
```



## Development Install

Follow these directions if you would like to hack on the code. 

Check out the code repository from Github:

```bash
git clone --recurse-submodules https://github.com/dannyquist/oli-mmdvm.git
cd oli-mmdvm
```

Create pre-requisite directories

```bash
sudo mkdir /oli
sudo chown -R pi /oli
cp conf/MMDVM.ini.handlebars /oli
```

Install yarn / nextjs dependencies (get a coffee):

```bash
yarn
```

Build the code (this will take a while):

```bash
yarn build
```

Install modified MMDVMHost:

```bash
cd MMDVMHost
make -j
INSTALL_DIR=/oli make install
```

Start the webserver:

```bash
yarn dev
```

Visit http://yourpi.local:3000/wizard on your browser, configure and 
press `Save`.

Start MMDVMHost

```bash
/oli/MMDVMHost /oli/conf/MMDVM.ini
```

Refresh the main page http://yourpi.local/ and you should see some activity.

# Contribution Guide

Send me a pull request.

# License
Copyright (C) Danny Quist, K1HYL

See `LICENSE` file.

# Changelog

- 14 August 2022 - initial release for Defcon 30 Ham Radio Village talk
- 16 August 2022 - Configuration saves now restart the MMDVMHost docker 
