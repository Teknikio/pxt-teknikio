#!/bin/sh

git filter-branch -f --env-filter '

OLD_EMAIL="y8762012+NCo"
CORRECT_NAME="moniecodes"
CORRECT_EMAIL="mona24@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

 git-rewrite-author -r "8762012+NColey@users.noreply.github.com" "mona24@gmail.com" "moniecodes"
