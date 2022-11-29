import _ from "lodash";
import { ValidationError } from "jsonschema";

function cleanUpErrorMesssages(errors: ValidationError[]) {
  let errorMsg = "";
  const errs = errors.map((e) => {
    let key;

    //this is to the determine the key
    if (e.property.includes("instance.")) {
      key = e.property.replace("instance.", "");
    } else {
      key = e.argument;
    }

    //this is to convert first_name or firstName to First Name
    let property = _.startCase(_.camelCase(key));

    if (e.message.includes("requires")) {
      e.message = `${property} is required`;
    } else if (e.message.includes("is not of a type")) {
      e.message = `${property} ${e.message}`;
    } else if (e.message.includes("minimum") || e.message.includes("maximum")) {
      e.message = `${property} ${e.message}`;
    }
    return {
      [key]: e.message,
    };
  });

  //This is used to convert an arary of objects into one big object
  for (let err of errs) {
    // Object.assign(errorObj, err);
    for (let key in err) {
      errorMsg += ` ${err[key]}`;
    }
  }
  return errorMsg;
}

export default cleanUpErrorMesssages;
