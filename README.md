# Epic Mail

This is the web app that helps people exchange
messages/information over the internet.

### Testing
[![Build Status](https://travis-ci.org/mnzube/Epic-Mail.svg?branch=develop)](https://travis-ci.org/mnzube/Epic-Mail)[![Coverage Status](https://coveralls.io/repos/github/mnzube/Epic-Mail/badge.svg)](https://coveralls.io/github/mnzube/Epic-Mail)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites
```
-node js 
-express
```
## User Interface (UI)
* HTML
* CSS
* Javascript

### UI Link Example
[Epic Mail](https://mnzube.github.io/Epic-Mail)

## API ENDPOINTS

| Resource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/messages | GET | Fetch all emails |
| /api/v1/messages/message/:id | GET | Fetch a specific email |
| /api/v1/messages/v/unread | GET | Fetch all unread messages |
| /api/v1/messages/v/sent | GET | Fetch all sent messages |
| /api/v1/messages | POST | Create a  message |
| /api/v1/messages/message/:id | DELETE | Delete a specific email |
| /api/v1/signup | POST | Create a  contact |
| /api/v1/signin | POST | Log in a contact |

### Language used
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Setup
Clone repo

```
https://github.com/mnzube/Epic-Mail
```

### Run

```
npm start 
```

## Running the tests
```
npm tests
```

## Authors

* **Michael Nzube** - *Initial work* - [Epic-Mail](https://github.com/mnzube/Epic-Mail)

