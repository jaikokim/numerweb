const express = require('express');
const router = express.Router();
const math = require('mathjs');

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

  res.json({
    tmpArr: tmpArr

  })
});
module.exports = router;

