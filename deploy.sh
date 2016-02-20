#!/bin/bash
set -e

green='\033[1;32m'
reset='\033[0m'
PRIVATE_KEY_NAME='ssh-private-key'

eval $(ssh-agent)
echo "$STRIDER_SSH_PRIV" > $PRIVATE_KEY_NAME
chmod 600 $PRIVATE_KEY_NAME
ssh-add $PRIVATE_KEY_NAME

printf "Copying build to remote server…\n"
scp -r dist/ deploy@player-host.shoutca.st:player-${STRIDER_JOB_ID}

printf "Removing the backup of the previous production build…\n"
ssh deploy@player-host.shoutca.st "rm -rf ~/player.backup || true"

printf "Making a backup of the current production build backup…\n"
ssh deploy@player-host.shoutca.st "mv /var/www/html/player ~/player.backup"

printf "Moving the new build…\n"
ssh deploy@player-host.shoutca.st <<EOF
mkdir /var/www/html/player
mv ~/player-${STRIDER_JOB_ID} /var/www/html/player/dist
date > /var/www/html/player/build-time
echo ${STRIDER_JOB_ID} > /var/www/html/player/ci-job-id
EOF

printf "${green}Deployed.${reset}\n"

eval $(ssh-agent -k)
rm $PRIVATE_KEY_NAME
