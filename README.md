[![outdoor-now test CI](https://github.com/uvic-seng321/project-req-rats/actions/workflows/outdoor-now_CI_test.yml/badge.svg)](https://github.com/uvic-seng321/project-req-rats/actions/workflows/outdoor-now_CI_test.yml)

# Assignment 4

For the marker: To test this project, first create a codespace on main and cd to the outdoor-now directory. Then run npm install to ensure that all packages are installed and then run 'npm test' to execute the unit test suite, running the 'npm run integration' command will execute the integration test suite. Running 'npm test' or 'npm run integration' will reult in a coverage report being printed to the console; these coverage reports are also available in the 'coverage' and 'integration_coverage' directories in different formats.

One of these formats is HTML. This is the reson for the high percentage of HTML in the project.

'npm run integration' was created so that the integration tests, which leverage APIs with call limits, will not run everytime npm test is ran.

# Assignment 5

## Installation and Running of the Project

To run this project you must have Node.js installed as this project uses npm to manage packages and to run the scripts responsible for running and testing this project. Once Node.js is installed, clone this project. Once the project has been cloned, open a terminal and cd into the outdoor-now directory. Once in this directory run "npm install" to install all the necessary dependencies and packages. Once the packages and dependancies are installed run "npm run dev" and navigate to <http://localhost:3000> to run the project. If there are any issues with the installation of the packages or running the project please email <charliewager@uvic.ca>.

## Testing the project

### Selenium Tests

These selenium tests must be run from the testers machine and not from a codespace. In order to run the selenium tests:

- install Node.js and clone the project as outlined above
- cd into the outdoor-now directory and run "npm install"
- run "npm run dev" to start the project on <http://localhost:3000>
- then run "npm run selenium" to run the selenium tests

### Cucumber (BDD) Tests

- Run the cucumber tests by running opening a codespace, running "npm install", and then running "npm run cucumber-test".

### A4 integration and TDD tests

- The TDD tests are automatically ran through a GitHub CI action and therefore do not need to be ran maunally.
- Integration test can be run by opening a codespace, running "npm install", and then running "npm run integration".

Cucumber and Integration tests are to be run in codespaces to avoid any issues that may be caused by a testers environment.

## CI Explanation

The CI in this project remains the same as it did for A4, it only runs the test that are not in the integration or selenium folders, it also does not run the cucmber tests residing in the features folder. The ommssion of these test is intentional. This is done since the cucumber tests and the integration tests run the external APIs used in this project. These APIs are free but do have call limits, in order to avoid exceeding these call limits these tests are not included in the CI action. The selenium tests are excluded as they rely on the project running on localhost:3000, to start this server, run the selenium tests, then shut down the server through the CI action would pose a massive challenge and might cause multiple problems in the project. In other words, integreating these tests into CI was out of scope.

Run git pull whenever you are about to start working on the project.
Anytime packages are added, run npm install to get the packages.
Run npm install after every pull just to be safe.

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=9789508)
