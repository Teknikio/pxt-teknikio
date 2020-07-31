# Instructions for updating pxt-teknikio documentation

This repo contains the editor hosted at https://bluebird-prod.teknikio.com .

* (optional) install [Visual Studio Code](https://code.visualstudio.com/)

## Local server setup

This setup gives you a local version of the editor and the ability to test your changes and updates to the documentation.

### Setup

Install Node if you haven't already

* install [Node.js 8+](https://nodejs.org/en/download/)

Clone the pxt-teknikio repository by running the following command

```
git clone https://github.com/Teknikio/pxt-teknikio.git
```

Next, we need to be inside the folder to set things up.  Run the following command 

```
cd pxt-teknikio
```

Run the set up script that will install any requirements necessary to test locally on your machine.

```
bash setup_pxt
```

Don't forget to periodically ``git pull`` and ``npm install`` to get the latest changes.

### Making changes and updates to docuemntation

The documention is included in 

```
pxt-teknikio/docs
```

Do not make any updates to documentation other than inside this folder or your changes/updates will be overwritten during the build process.  

### Testing changes/updates to documentation

After you have made changes or udpate to the documentation, you can test them by running the local server.  To run the server locally, run the following commands

The documentation content is generated based on the content of the /docs folder. In order to re-generate the content, it's necessary to clear out the old files using the command below.

```
pxt clean
```
Next, we run the serve command which will re-generate the docuemntation content and open the browser after it is finished.  

```
pxt serve
```

### Submitting your changes

After you are happy with your changes and are ready to add them to production, run the update_docs script by running the following command

```
bash update_docs
```

The update_docs script will add your changes, add a commit message indicating there were updates to the documentation, create a new branch based on the current date and time and then push the changes to github.  After running the update_docs script, let one of the developers know you made updates to the documentation so they can merge them into the live website.
