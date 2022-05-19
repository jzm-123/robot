import React,{useState,useEffect} from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
import robots from './mockdata/robots.json'
import Robot from './components/Robot';
import RobotDiscount from "./components/RobotDiscount";
import ShoppingCart from './components/ShoppingCart';
interface Props{
  username:string
}
const App:React.FC=(props)=> {
  const [count,setCount]=useState<number>(0);
  const [robotGallery,setRobotGallery]=useState<any>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [error,setError]=useState<string>("");
  useEffect(()=>{
    document.title=`点击了${count}次`
  },[count]);
  useEffect(()=>{
    const fetchData=async()=>{
      setLoading(true);
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json();
        setRobotGallery(data);
      } catch (error:any) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  },[])
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo"></img>
        <h1>罗伯特机器人</h1>
      </div>
      <button onClick={()=>{
        setCount(count+1);
    }}>Click</button>
    <span>{count}</span>
      <ShoppingCart></ShoppingCart>
      {
        !error|| error!=""&& <h3>{error}</h3>
      }
    {   !loading?
          <div className={styles.robotList}>
          {robotGallery.map((r,index) => (
            index%2==0?<RobotDiscount id={r.id} email={r.email} name={r.name} >
            </RobotDiscount>:
                  <Robot id={r.id} email={r.email} name={r.name} />
                ))}
              </div>:<h2>loading 加载中</h2>
    }
    </div>
  );
}

export default App;
