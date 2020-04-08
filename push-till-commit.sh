#!/bin/bash
SHA_COMMIT_HASH=$1
BRANCH_NAME=$2
echo "Calling git push origin $SHA_COMMIT_HASH:$BRANCH_NAME"
git push origin $SHA_COMMIT_HASH:$BRANCH_NAME