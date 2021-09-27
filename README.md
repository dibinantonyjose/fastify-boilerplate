# Fastify Boilerplate

> Fastify is a web framework highly
> focused on providing the best developer
> experience with the least overhead and
> a powerful plugin architecture.
> [Fastify Website](https://www.fastify.io/)

### Installing

##### Clone project

```console
git clone https://github.com/dibinjose/fastify-mongo-boilerplate.git
```

##### Install packages

```console
cd fastify-mongo-boilerplate

yarn
```

##### Start Server

```console
yarn run dev
```

##### Swagger UI

localhost:3000/docs

##### Header

For authorized routes, authorization token needs to be passed as Authorization in header

##### Structure

```txt
.
├── env.sample
├── Insomnia.json
├── package.json
├── prettier.config.js
├── README.md
├── src
│   ├── app.js
│   ├── models
│   │   ├── sampleModel.js
│   │   └── userModel.js
│   ├── plugins
│   │   ├── apiReply.js
│   │   └── mongo.js
│   ├── schema
│   │   ├── sampleSchema.js
│   │   └── userSchema.js
│   ├── services
│   │   ├── auth.js
│   │   ├── public.js
│   │   └── user.js
│   └── utils
│       ├── replyGenerator.js
│       └── swagger.js
└── yarn.lock

```
