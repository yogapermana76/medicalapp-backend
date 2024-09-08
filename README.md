<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# MedicalApp Backend NestJS

## Table Of Contents

- [Intro](#intro)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Clone](#clone)
  - [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

## Intro

This is backend application made with NestJS.

## Requirements

- [Node.js](https://nodejs.org/en/) v16.x LTS version
- [Yarn](https://yarnpkg.com/lang/en/docs/install) package manager
- [PostgreSQL](https://www.postgresql.org/download) database

## Project Structure

<details>
<summary>Expand to show the structure of this project</summary>

```sh
├───public
├───prisma                # database schema
├───src                   # store code in here
    ├───decorators        # common decorators
    ├───helpers           # common helpers
    ├───modules           # store specific module in here
```

</details>

## Installation

### Clone

```sh
git clone https://github.com/yogapermana76/medicalapp-backend.git
# or if using ssh
# git clone git@github.com:yogapermana76/medicalapp-backend.git

cd medicalapp-backend
```

### Environment Variables

```sh

# DB CONFIG
DATABASE_URL=

```

### Install Depedencies

```sh
yarn # or yarn install
```

### Available Scripts

#### Run Project

- Run development server

  ```sh
  yarn start:dev
  ```

- Build for production

  ```sh
  yarn build && yarn start:prod
  ```

## Dependencies

| Name    | Description                            | Docs                                                                    |
| ------- | -------------------------------------- | ----------------------------------------------------------------------- |
| NestJS  | Base framework                         | [docs.nestjs.com](https://docs.nestjs.com)                              |
| Prisma  | ORM for manage the PostgreSQL database | [prisma.io](https://www.prisma.io)                                      |
| Swagger | API documentation                      | [docs.nestjs.com/openapi](https://docs.nestjs.com/openapi/introduction) |
