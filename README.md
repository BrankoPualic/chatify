# Project Instructions

Welcome to the Chatify project! This document will guide you through setting up the environment and the prerequisites you'll need to get started.

## Prerequisites

Before you start working on this project, ensure you have the following prerequisites installed on your system:

- **IDE/Editor:** Visual Studio Code
- **Programming Language:** SQL Server 2019, Angular CLI
- **npm**: Node.js 22.2.0

## Getting Started

### Server Side

1. Execute `database-script.sql` script file in your SQL Server 2019.
2. Open chatify-backend in VS Code.
3. Change name of the server inside `config.js` to your local SQL Server name.
4. Run `npm install`.
5. Start server by running `npm start`.

### Client Side

1. Open chatify-social-media-app in VS Code.
2. Run `npm install`.
3. Start client side by running `ng serve` (`npm start` if you don't have Angular CLI).

## Application Overview

Chatify is social media application that allows registrated users to connect, chat 1 on 1 and in groups, post images, comment on them, etc. Application uses Socket.io for real time chatting and triggers for certain functionalities.

Application is developed in Angular 16 and NodeJS with Express.js.

Below are provided test users who already have group and 1 on 1 chat history. You can test it by signing in with both of them one in current browser and the other one in incognito mode or on another browser.

#### Test Users

- First User

  Email

  ```
  bobi@gmail.com
  ```

  Password

  ```
  Bobi12345
  ```

- Second User

  Email

  ```
  test4@gmail.com
  ```

  Password

  ```
  Test12345
  ```

Enjoy!
