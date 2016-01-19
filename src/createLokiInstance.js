import Loki from 'lokijs';

export default ({ filename }) => {
  return {
    loki: new Loki(filename),
    filename
  };
};
