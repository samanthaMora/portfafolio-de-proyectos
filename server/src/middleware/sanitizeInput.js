import sanitizeHtml from "sanitize-html";

const sanitizeInput = (fields = []) => {
  return (req, res, next) => {
    if (!req.body) return next();

    fields.forEach((field) => {
      if (req.body[field]) {
        req.body[field] = sanitizeHtml(req.body[field], {
          allowedTags: [],
          allowedAttributes: {}
        });
      }
    });

    next();
  };
};

export default sanitizeInput;
