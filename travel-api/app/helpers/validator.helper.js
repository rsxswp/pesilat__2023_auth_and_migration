const ValidatorLib = require("fastest-validator");
const v = new ValidatorLib();

const validasi = (dataValidasi, schemaValidasi) => {
  try {
    const validate = v.validate(dataValidasi, schemaValidasi);

    if (validate.length > 0) {
      return {
        gagal: () => true,
        erorrMessages: () => validate,
      };
    }

    return {
      gagal: () => false,
      erorrMessages: () => null,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = validasi;
