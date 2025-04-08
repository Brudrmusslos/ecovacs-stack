import { debug } from '@/utils/debug';
import { createServer } from 'https';
import { options, requestListener } from './server.utils';

const httpsServer = () => {
  const server = createServer(options, requestListener);
  const port = 443;

  server.listen(port, () => {
    debug('HTTPS Server is running', { port });
  });

  return server;
};

export default httpsServer;
