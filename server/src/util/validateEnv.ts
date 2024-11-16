import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URL: str(),
  JWT_SECRET_TOKEN: str(),
});
