# Initial setup

After cloning the repository, run `grunt install-hook` to set up the
git hooks. This is used to maintain the codebase quality.

---

# Work environment

- Run `grunt dev` to start a dev server on localhost:4000.

- Run `grunt test` to check the codebase for issues. This will run ESLint
  and tests (powered by Karma).

---

# Conventions

- The source is located in src/app.

- File names are in lowercase and are separated by hyphens.

- Controllers have a -ctrl suffix, services have -service, and so on.
  Unit test files have a .tests.js suffix.

---

# Committing

- Changes are to be made and committed in the `dev` branch.

- Avoid making huge, monolithic commits.

    As a reminder, commit messages should follow a set of good practices:

    - The first line should be shorter than 52 characters if possible,
      and the verb should be written at the present tense, not past.

    - The first line should not have a trailing dot.

    - If you include a longer message after the title, the second line
      should be left empty.

    - All lines apart from the first line should be shorter than 72
      characters if possible.

    - A good commit message should describe what the commit does.

    - Example:

        > Fix a critical bug in DumbService
        >
        > DumbService contained an infinite loop that caused the whole
        > app to not load. This commit fixes DumbService and by
        > extension, fixes the whole application.

    - Do NOT write:

        > Changed something.
        > I changed something but I'm not telling you what! Haha!
        > I also like to put everything on the same line, making my commit very very long and making tools such as
        > git diff work less optimally!

---

# Merging into production

- Merge your code into the `test` branch and test it.
  Both by using the player and running tests with `grunt test`.
  Make sure your code works before merging to avoid messy commits!

- Run ./generate-production-build. This will merge test into prod and generate a production build.

- Tag the release with a version number that follows semver.
  Use `git tag` to see the latest tags.

- Push the changes back to the repository.

---

# Deploying

- Check out the tag you just created on the production server.
