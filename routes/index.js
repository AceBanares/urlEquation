var express = require("express");
var router = express.Router();
const methodList = { MULTIPLY: "*", DIVIDE: "/", ADD: "+", SUBTRACT: "-" };

/* GET home page. */
router.get("/", function(req, res, next) {
  let method = req.query.method || "";
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);

  const validMethods = Object.keys(methodList);

  let message = `Please enter a valid method: ${validMethods.join(" | ")}`;
  let equation = ``;

  if (validMethods.includes(method.toUpperCase())) {
    method = method.toUpperCase();
    message = method;
    const operator = methodList[method];

    if (isNaN(x) || isNaN(y)) {
      equation +=
        isNaN(x) && isNaN(y)
          ? `Please enter the value of 'x' and 'y'`
          : isNaN(x)
          ? `Please enter the value of 'x'`
          : `Please enter the value of 'y'`;
    } else {
      const result = Function(`"use strict"; return ${x}${operator}${y}`)();
      equation = `${x} ${operator} ${y} = ${result}`;
    }
  }

  // res.send(method);
  res.render("index", { title: `${message}`, body: `${equation}` });
});

module.exports = router;
