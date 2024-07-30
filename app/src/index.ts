import app from './app';
import appConfig from './configs/app.config';
import setup from './helpers/setup.helper';

const { appName, port } = appConfig;

setup().then(() => app.listen(port, () => console.log(`Application ${appName} listening at port ${port}`)));
