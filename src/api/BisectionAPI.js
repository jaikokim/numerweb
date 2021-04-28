const express = require('express');
const { evaluate, log } = require('mathjs');
const router = express.Router();
const math = require('mathjs');
/**
 * @swagger
 *  tags:
 *   name: Bisection
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/BisectionAPI:
 *   get:
 *     tags: [Bisection]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/BisectionAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [Bisection]
 *     responses:
 *       201:
 *         description: post data
 */

 
router.post('/api/BisectionAPI', (req, res) => {

  
  var eq = math.compile(req.body.equation);
  var xl = parseFloat(req.body.xl);
  var xr = parseFloat(req.body.xr);
  var xm = 0;
  var n = 0;
  var check = parseFloat(0.000000);
  var tmpArr = []; //keepArrayชั่วคราว

  const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2 
  }

  do {
    let XL = {  //component keepxl iteration
      x: xl //resetaluefromiteration
    };
    let XR = {
      x: xr
    };

    xm = findxm(xl, xr); 
    n++; //iterationup++
    if (eq.evaluate(XL) * eq.evaluate(XR) > 0) { //evalutateคำนวณสมการ
      check = Math.abs((xm - xl) / xm).toFixed(8); 
      xl = xm;
    } else {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    }

    tmpArr.push({
      'iteration': n,//header value 
      'xl': xl,
      'xr': xr,
      'xm': xm,
      'Error': check,
    });

  } while (check > 0.000001 && n < 25) //checkvaluepai++
  
  console.log(eq.evaluate({x:xm}));

  res.json({ //ส่งค่าระหว่างapi
    tmpArr: tmpArr

  })
});
module.exports = router;

