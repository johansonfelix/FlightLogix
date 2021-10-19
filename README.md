# AirlineLogic
 
+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_



  _____   _   _           _       _       _                       _        
 |  ___| | | (_)   __ _  | |__   | |_    | |       ___     __ _  (_) __  __
 | |_    | | | |  / _` | | '_ \  | __|   | |      / _ \   / _` | | | \ \/ /
 |  _|   | | | | | (_| | | | | | | |_    | |___  | (_) | | (_| | | |  >  < 
 |_|     |_| |_|  \__, | |_| |_|  \__|   |_____|  \___/   \__, | |_| /_/\_\
                  |___/                                   |___/            

            ______
            _\ _~-\___
    =  = ==(____AA____D
                \_____\___________________,-~~~~~~~`-.._
                /     o O o o o o O O o o o o o o O o  |\_
                `~-.__        ___..----..                  )
                      `---~~\___________/------------`````
                      =  ===(_________D

+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

RELEASE: V1.0
AUTHORS: Andrew Kor & Johanson Felix






------------------------------------------------------------------------------------------------------------

INSTALLATION AND CONFIGURATION

Requirements:

- A compatible IDE (Intellij, eclipse)
- Maven installed, with "mvn" in PATH
- Github account, with repo access
- npm (Node package manager) installed


STEPS:

- Clone the repository from github.com/johansonfelix/flightlogix

SERVER SIDE CONFIG:

- Open a terminal, and go to the path: ~/FlightLogix
- Enter the command: "mvn liberty:dev"
The server should take ~ 2 minutes to start running. You should see a couple of links to the server when it's done.
- You can now make requests to the server.

FRONT-END SIDE CONFIG:

- Open a terminal, and go to the path: ~/FlightLogix/front-end
- Run "npm install" to install the required packages. If need be, run "npm audit fix" to fix any errors
in the packages.
- Once packages are installed, you can run the front-end side by using the command "npm start"
- You should now see a react webpage. You can't make requests yet, because you need to add the SSL certificate.
- On your browser, go to Manage SSL Certificates and import the key.12 file located at:
~\FlightLogix\target\liberty\wlp\usr\servers\defaultServer\resources\security\key.p12
As "Trusted root authority"
- You can now make requests to the server from the front-end!
