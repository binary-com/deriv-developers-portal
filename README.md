<h1 align="center">
  Deriv.com API
</h1>

Deriv API – Build and customise your trading app

## In this document:

-   [Pre-installation](#pre-installation)
-   [Quick start](#quick-start)
-   [How to contribute](#how-to-contribute)
-   [Manage releases](#manage-releases)
-   [Test link deployment](#test-link-deployment)

## Pre-installation

Before running or contribute to this project, you need to have the setup of the following packages in your environment

-   node >=16+
-   npm >=6.14
-   git (for `contribution`)

Moreover, having these extensions will help you to speed up the development process and adhere to the best practices

-   Prettier: setup in your editor https://prettier.io/ (or you can run `npm run format`)

## Quick start

1.  **Fork the project**

    In order to work on your own version of the Deriv application, please fork the project to your own repo.

2.  **Clone using SSH**

    ```sh
    git clone git@github.com:your-github-username/deriv-developers-portal.git
    ```

3.  **Enter project directory**

    ```sh
    cd deriv-developers-portal
    ```

4.  **Install your dependencies:**

    ```sh
    npm install
    ```

5.  **To start developing:**

    ```sh
    npm run dev
    ```

1.  Release to staging:

Merging to master (squash and merge) will automatically release the last commit to the staging server https://staging-api.deriv.com/

2. Release to production:

Releasing to production requires a tag using the following format:

`production_VYYYYMMDD_${Integer}` --- Integer is the release version

## How to contribute

PRs are based on the master branch

1. Create branch from the latest master branch

    ```sh
    git checkout master
    git pull upstream master
    git checkout -b [_your_branch_name]
    ```

2. Make your changes

3. Make pull request

-   Push your changes to your origin

    ```sh
    git push -u origin [_your_branch_name]
    ```

## Test link deployment

Upon creating PR, [Vercel](https://vercel.com/) will auto-generate a test link inside the PR. you can use that to preview the test link for the changes you have made.
