# betting-service

### this a monorepo that contains the api and the worker bohboh

#### do not forget to install the dependencies on the root in order to be able to run scripts

yarn install

This project is using yarn as a package manager

##### to launch the api and the workers this use this command

node script_launch.js --instances N

##### to launch the stress test script use this command

node script_stress_test.js --messages N --sockets M --count L
