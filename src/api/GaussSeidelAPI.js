const express = require("express");
const router = express.Router();
const math = require("mathjs");

router.post("/api/GaussSeidelAPI", (req, res) => {
  var MatrixA = req.body.matrixA;
  var MatrixB = [].concat(...req.body.matrixB);
  var MatrixX = [].concat(...req.body.matrixX);
  var solution = [];
  var temp  = [];
  var tempB;
  var n = MatrixA.length;
  var checkM = -1;
  var xold;
  epsilon = new Array(n);
  for(var i = 0;i<n;i++){
    if(MatrixA[i][i]==0){
        checkM = i;
    }
  }
  if(checkM > -1)
  {
    for(var j = 0 ; j < n ; j++)
    {
      if(checkM < n-1)
      {
        temp[j] = MatrixA[checkM]
        MatrixA[checkM] = MatrixA[checkM+1];
        MatrixA[checkM+1] = temp[j];
        tempB = MatrixB[checkM];
        MatrixB[checkM] = MatrixB[checkM+1];
        MatrixB[checkM+1] = tempB;


      }
      else
      {
        temp[j] = MatrixA[checkM];
        MatrixA[checkM] = MatrixA[checkM-1];
        MatrixA[checkM-1] = temp[j];
        tempB=MatrixB[checkM];
        MatrixB[checkM]=MatrixB[checkM-1];
        MatrixB[checkM-1]=tempB;
      }
    }
    console.log(MatrixA);
    console.log(MatrixB);
  }
  do {
    xold = MatrixX;
    for (var i = 0; i < n; i++) {
      var sum = 0;
      for (var j = 0; j < n; j++) {
        if (i !== j) {
          sum = sum + MatrixA[i][j] * MatrixX[j];
        }
      }
      MatrixX[i] = (MatrixB[i] - sum) / MatrixA[i][i];
    }
  } while (error(MatrixX, xold));

  for (i = 0; i < MatrixX.length; i++) {
    solution.push(MatrixX[i]);
  }

  function error(xnew, xold) {
    for (var i = 0; i < xnew.length; i++) {
      epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i]);
    }
   
      if (epsilon[0] > 0.000000001 && epsilon[1] > 0.000000001 && epsilon[2] > 0.000000001) {
        return true;
      }
    return false;
  }

  console.log(solution);
  console.log(math.multiply(MatrixA, solution));
  res.json({
    out: solution,
  });
});
module.exports = router;