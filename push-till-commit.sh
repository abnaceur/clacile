#!/bin/bash
SHA_COMMIT_HASH=$1
BRANCH_NAME=$2
echo "Calling git push origin $SHA_COMMIT_HASH:$BRANCH_NAME"
git push origin 9eb11f70fffd468fb5ee71c4fda6c6254682f28c:feature/CYC-1355