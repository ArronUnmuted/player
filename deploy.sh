#!/bin/bash

set -e

green='\033[1;32m'
blue='\033[1;34m'
reset='\033[0m'

printf "${blue}Copying build to remote server…${reset}\n"
scp -r dist/ deploy@player-host.shoutca.st:player-${CI_BUILD_REF}

printf "${blue}Removing the backup of the previous production build…${reset}\n"
ssh deploy@player-host.shoutca.st "mv -rf ~/player.backup || true"

printf "${blue}Making a backup of the current production build backup…${reset}\n"
ssh deploy@player-host.shoutca.st "mv /var/www/html/player ~/player.backup"

printf "${blue}Moving the new build…${reset}\n"
ssh deploy@player-host.shoutca.st "mkdir /var/www/html/player"
ssh deploy@player-host.shoutca.st "mv ~/player-${CI_BUILD_REF} /var/www/html/player/dist"
ssh deploy@player-host.shoutca.st "date > /var/www/html/player/build-date"
ssh deploy@player-host.shoutca.st "echo ${CI_BUILD_REF} > /var/www/html/player/build-ref"

printf "${green}${CI_BUILD_REF} deployed${reset}\n"
