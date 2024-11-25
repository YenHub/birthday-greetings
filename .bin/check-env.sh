#!/usr/bin/env bash

# This script verifies whether a .env file is present in the project

SUCCESS_MESSAGE='\nSourcing environment variables found in .env.local\n'
ERROR_MESSAGE='
ERROR: No .env file found

Please run `yarn initial:setup` to initialise your environment.

For more information see the project ./README.md
'

if [ ! -f .env ]; then
  echo "$ERROR_MESSAGE"
  exit 2
else
  echo -e "$SUCCESS_MESSAGE"
fi
