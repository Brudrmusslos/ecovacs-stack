import { debug } from '@/utils/debug';
import { createServer } from 'http';
import { requestListener } from './server.utils';

const httpServer = () => {
  const server = createServer(requestListener);
  const port = 8080;

  server.listen(port, () => {
    debug('HTTPS Server is running', { port });
  });

  return server;
};

export default httpServer;
