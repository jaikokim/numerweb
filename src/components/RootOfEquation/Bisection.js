import React, {
  useState,
  useEffect
} from 'react';
import {
  Container
} from 'react-bootstrap';
import {
  Table
} from 'antd'; //
import Axios from 'axios';

//C:\numer\src\components\RootOfEquation
//.อยู่ในไฟล์เดียวกัน
//C:\numer\src
import '../../App.css';
import Topbar from '../Topbar';
import Footer from '../Footer';



const header = [{
  title: () => {
    return <p> Iteration </p>;
  },
  dataIndex: 'iteration',
  key: 'iteration',
  align: 'center',


}, {
  title: () => {
    return <p> X <sub> L </sub></p> ;
  },
  dataIndex: 'xl',
  align: 'center',
  width: 300,


}, {
  title: () => {
    return <p> X <sub> R </sub></p> ;
  },
  dataIndex: 'xr',
  align: 'center',
  width: 300,

}, {
  title: () => {
    return <p> X <sub> M </sub></p> ;
  },
  dataIndex: 'xm',
  align: 'center',
  width: 300,

}, {
  title: 'Error',
  dataIndex: 'Error',
  align: 'center',
  width: 300,

}]

var newArr = [];


export default function Bisection() {



  const [equation, setEquation] = useState("x^3 - x - 3");
  const [btnState, setBtnState] = useState(0);
  let [xl, setXL] = useState(1);
  let [xr, setXR] = useState(2);

  useEffect(() => {
    document.title = "Bisection Method ";
  }, []);

  const handleSubmit = (e) => { //โยนค่าใส่ฟังก์ชันตัวแปร
    if (btnState === 0) {
      e.preventDefault();
      bisection(); //ฟังก์ชัน
    }
  };

  const bisection = () => {

    Axios
      .post("http://localhost:5000/api/BisectionAPI", { //เรียกไฟล์APIมาใช้
        xl: parseFloat(xl),
        xr: parseFloat(xr),
        equation: equation,
      })
      .then(res => {
        console.log(res.data.tmpArr);
        newArr = res.data.tmpArr;
        setBtnState(1);
      })
      .catch(err => {
        console.log(err);
      });
      
  }

  return (
    <div>
      <Topbar/>
      <p></p>
            <div>
            <Container>  
              <h1><code>Bisection Method</code></h1>
              <p>Equation :<span>&nbsp;&nbsp;</span>{equation}</p>
              <p>X<sub>L</sub> :<span>&nbsp;&nbsp;</span>{xl}</p>
              <p>X<sub>R</sub> :<span>&nbsp;&nbsp;</span>{xr}</p>


              <form onSubmit={handleSubmit}>
                  <label>
                    Equation :<span>&nbsp;&nbsp;</span>
                    <input disabled={btnState} type="text" value={equation} onChange={e => setEquation(e.target.value)}
                    />
                  </label>
                  <p></p>
                  <label>
                    X<sub>L</sub> :<span>&nbsp;&nbsp;</span>
                    <input disabled={btnState} type="text" value={xl} onChange={e => setXL(e.target.value)}
                    />
                  </label>
                  <p></p>
                  <label>
                    X<sub>R</sub> :<span>&nbsp;&nbsp;</span>
                    <input disabled={btnState} type="text" value={xr} onChange={e => setXR(e.target.value)}/>
                  </label>
                  <p></p>

                  {btnState === 0  ? 
                  <button type="submit" disabled={btnState} value="Submit">Submit</button> :
                  <button type="submit" disabled={!btnState} value="Submit">Reset</button> }
                </form>
                <p></p><p></p>
            <div>
            {<Table dataSource={newArr} columns={header} rowKey='iteration' pagination={false}/>}
            </div>
          </Container>

      </div>
      <Footer />
    </div>
  );
}




