# express-mongodb-todo-example-01

YES! Yet another To-Do app to join the millions available out there.

This application is a demonstration of the use of **Express.JS server** with **MongoDB Atlas (cloud) database**.

This example demonstrates:

- Express.JS and MongoDB **setup** and **initiation** in the **server.js** file.
- **Server-side rendering**, with HTML included in the **server.js** file.
- **Client-side rendering**, with HTML and JavaScript included in the **browser.js** file in the **public** folder.
- **Express.JS** route creation for the **CRUD** operation with **MongoDB**.
- The use of **Middleware**, in particular the inclusion of Password login and basic **authentication** and security protection.
- **HTML sanitization** to user entered values.

## NPM Packages used

- nodemon (Dev Dependency)
- dotenv
- express
- moment
- mongodb
- sanitize-html

## The .env file Setup

A **.env** file is NOT included in this repository, hence one must be created.

The **.env** file includes the following variables:

- **PORT**
- **CONNECTIONSTRING**

The **PORT** variable is the URL value which will be used if this application is hosted online (via heroku.com for example).

The **CONNECTIONSTRING** is obtained from **MongoDB Atlas** and looks similar to the following line:

```bash
mongodb+srv://<username>:<password>@cluster0.k8ycp.mongodb.net/<dbname>?retryWrites=true&w=majority
```

The `<password>`, ```<username>``` and the ```<dbname>``` will need to be replaced with details as provided by MongoDB Atlas.

> NOTE: The ```<dbname>``` is the name of the database that connections will use by default.

## MongoDB: How to get a Connection String

In your MongoDB Atlas site:

1. From the **DATA STORAGE** section, select **Clusters**.
2. In the cluster you want to work in, select the **CONNECT** button.
3. This will open the **Connect to Cluster0** (or whatever Cluster name you are creating a connection to) dialogue box.
4. Select the Connect your application option.
5. If you do not have a connection yet:

   1. then you will need to specify the **Whitelist your connection IP address**: select the **Add a Different IP Address** button and type in **0.0.0.0/0**. This will allow a connection from anywhere to the database.
   2. **Create a MongoDB User**: Choose a Username and Password. This is NOT the Username and Password we used to login to the MongoDB Atlas site, this is the Username and Password used in the **Connection String** which will grant us access to the database.
   3. If you **do** have a connection, copy the Connection String provided.
