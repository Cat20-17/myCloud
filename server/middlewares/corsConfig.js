const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  exposedHeaders: ['Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;