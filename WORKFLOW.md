## Initial setup

After cloning the repository, run `grunt install-hook` to set up the
git hooks. This is used to maintain the codebase quality.

## Working on the code

The source is located in src/app. File names are in lowercase and
are separated by hyphens. They all have a suffix attached when applicable;
for instance, controllers have a -ctrl suffix, services have -service, and so on.

When adding new code or fixing bugs, consider also improving and/or adding tests.
Unit test files have a .tests.js suffix.

Use `grunt dev` to start a dev server on localhost:4000.
It will serve Player and automatically reload on changes.

## Committing

A fork workflow is used for Player, so you won't directly work in Player's repo.
You'll work on your fork of the Player repository.

**IMPORTANT**: Before committing, check out a new branch and give it a descriptive name,
such as `feature/now-playing`, `hotfix/config-loading`, or `code-cleanup`.

Commit regularily and avoid making huge, monolithic commits. And please,
write good and descriptive commit messages.
A good commit message should describe what the commit does.

Before committing, test your code with `grunt test` and also by using the player.
*Make sure it works before continuing.*

When you're done with your commits, push them to your repo.

When you think that your changes are ready to be merged into master,
open a pull/merge request to get your changes reviewed and merged.

## Releasing to production

```
git checkout production
git merge master
git push
```

Yes. That's it. Any pushes to production will automatically trigger
a build and a deploy to production.
