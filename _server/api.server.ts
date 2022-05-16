// @ts-nocheck
const bodyParser = require('body-parser');
const {create, defaults, router} = require('json-server');
const jwt = require('jsonwebtoken');
const {join} = require('path');

const PORT = process.env['PORT'] ?? 3000;
const DATA_PATH =
  process.env['DATA_PATH'] ?? __dirname.slice(process.cwd().length + 1);
const DATA_NAME = process.env['DATA_NAME'] ?? 'api.db.json';
const JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'] ?? 'MySecretKey';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] ?? '1h';
const server = create();

const jsonRouter = router(join(DATA_PATH, DATA_NAME));
const middlewares = defaults();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(middlewares);

server.post('/auth/login', (req, res) => {
  const payload: { email: string; password: string } = {
    email: req.body.email,
    password: req.body.password,
  };
  const user: { id: number; email: string; password: string } | null =
    (jsonRouter.db.get('users') as any)
      .find({email: payload.email, password: payload.password})
      .value() ?? null;

  if (user) {
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const {password, ...other} = user;
    res.status(200).json({accessToken, ...other});
  } else {
    const message = 'Incorrect username or password';
    res.status(401).json({message});
  }
});

server.use(/^(?!\/auth).*$/, async (req, res, next) => {
  // Для показа скелетонов
  if (req.method === "GET") {
    await sleep(1000);
  }
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const message = 'Error in authorization format';
    res.status(401).json({message});
    return;
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verifyTokenResult = jwt.verify(token, JWT_SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    ) as any;

    if (verifyTokenResult instanceof Error) {
      const message = 'Access token not provided';
      res.status(401).json({message});
      return;
    }
    next();
  } catch (err) {
    const message = 'Error access_token is revoked';
    res.status(401).json({message});
  }
});

server.use(jsonRouter);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port: ${PORT}`);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
