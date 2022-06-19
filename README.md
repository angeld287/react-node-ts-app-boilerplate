This is a application used to find web pages with dofollow links. The purpose of this application is to help SEO professionals to find greats backlinks for web pages. This app use google search engine api to search web pages and these web pages are examined with regular expressions to verify and catch html tags <a> with rel="dofollow".

```bash
<a href="https://example.com" rel="dofollow">Text</a>
```

# Run Application with Docker

In this session is explained how to up and down the containers of this application.

```bash
# In the root folder execute:

docker-compose up

# to delete the containers execute:

docker-compose down

```

# Run Application Local without Docker

Below mentioned are the steps to run the application locally.

```bash
#To the server application, in the root folder, execute:

npm run server

#To the client application, in the root folder, execute: 

npm run client

```

# Run Test

Below mentioned are the steps to execute the test for the project.

```bash
#To execute the server tests, in the root folder, execute:

npm run server-test

# or 

npm run server-test-watch 

```