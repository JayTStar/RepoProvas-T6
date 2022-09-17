import dotenv from 'dotenv';
import {app} from './app';
dotenv.config();

const PORT = process.env.PORT || 5000;

console.log(`Minha app está usando: ${process.env.DATABASE_URL}`);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
