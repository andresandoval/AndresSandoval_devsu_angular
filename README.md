AndresSandoval_devsu_angular Setup
==================================

This guide will help you set up the **AndresSandoval_devsu_angular** Angular project, build it, install a lightweight server, and open the English or Spanish version of the site from the appropriate directory.

Prerequisites
-------------

Before you begin, make sure you have the following installed on your system:

-   **Node.js**: You can download and install the latest LTS version from [Node.js official site](https://nodejs.org/).

-   **Angular CLI**: If you don't have Angular CLI installed globally, you can do so by running:

    

    `npm install -g @angular/cli`

1\. Clone the Repository
------------------------

Clone the repository to your local machine using Git:


`git clone https://github.com/andresandoval/AndresSandoval_devsu_angular.git
cd AndresSandoval_devsu_angular`

Alternatively, you can fork the repository and clone your fork.

2\. Install Project Dependencies
--------------------------------

Navigate to the project directory and install all the dependencies:



`npm install`

This will install all the necessary dependencies defined in `package.json`, including Angular and other packages.

3\. Build the Project
---------------------

To build the project for production, run the following command:


`ng build --prod`

This will create the production build in the `dist/browser/` directory. By default, the build will be generated for the `en-US` locale. If you have configured i18n for other languages, you can build for those as well.

### Build for Spanish Locale (es)

If you want to build the project for Spanish (or another language configured in `angular.json`), use the following command:


`ng build --prod --configuration=es`

This will create the build for the `es` (Spanish) locale in the `dist/browser/es/` directory.

4\. Install Lite Server
-----------------------

To serve the application locally with a lightweight server, you'll need to install `lite-server`:


`npm install lite-server --save-dev`

5\. Run Lite Server
-------------------

Once you have installed `lite-server`, you can run it and specify which directory to serve. Depending on the language version, use the following commands:

### Serve the English Version (from `dist/browser/en-US`)

`npx lite-server --baseDir=dist/browser/en-US`

### Serve the Spanish Version (from `dist/browser/es`)


`npx lite-server --baseDir=dist/browser/es`

This will launch the server and open the correct version of the site in your default browser.

6\. Open the Application in Your Browser
----------------------------------------

Once the server is running, it should automatically open the application in your default web browser. If not, you can manually visit the following URLs:

-   **English version**: `http://localhost:3000/`

-   **Spanish version**: `http://localhost:3000/` (served from `dist/browser/es`)

7\. Additional Commands
-----------------------

To run the project in development mode, use the Angular CLI development server:


`ng serve`

This will start a local development server at `http://localhost:4200`, where you can view the application during development.

* * * * *
