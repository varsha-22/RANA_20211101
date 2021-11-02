# Welcome to GitHub

Welcome to GitHub—where millions of developers work together on software. Ready to get started? Let’s learn how this all works by building and publishing your first GitHub Pages website!

## Getting Started

### Prerequisites

To be able to run this repository on your machine, you will need to have the following installed:
- NodeJS (> 14)

### Installing Dependencies

To install all needed Node and React dependencies, you can run:

```
npm install or npm i
```
### Copy env variable file

The code rests upon certain environemt variables that are expected to be declared inside a `.env` file.

Those variables are defined (with sensible defaults) in `.env.sample`, so you can copy that file as such:

```
cp .env.sample .env
```
### Database

You can either use a local or remote MongoDB to setup a database.

## Development

Once everything is installed and set up, you can start the project in development mode by running:
```
npm run dev
```

This will automatically watch any changes made to both the backend and frontend code, but you will still need to manually refresh your browser to fetch the latests static assets (there is no hot-reloading).

To run server and client code independently you can run by using:
```
npm run start or npm start
```
makes sure you will run this command inside that directory

Note: Please install FFmpeg in your machine for development env. 

## Questions?

If you have any questions, please feel free to reach out to me by email! Thank you! :) 