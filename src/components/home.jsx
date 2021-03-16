import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
export default class home extends Component {
   constructor(){
       super();
       this.state={
          Provider:"",
          Length:"",
          
           datas:[]
       }
   }
   //get total data
    componentDidMount(){
        axios.get("https://nut-case.s3.amazonaws.com/coursessc.json")
        .then(res=>{
            console.log(res.data)
            this.setState({datas:res.data})
          
        })
        .catch(err=>{
            console.log(err)
        })
    }
    onSessionHandler=(e)=>{
        this.setState({Next:e.target.value})
    }
    onLengthHandler=(e)=>{
        this.setState({Length:e.target.value})
    }
    onProviderHandler=(e)=>{
        this.setState({Provider:e.target.value})
    }
    //get data based on Next Session Date
    onClickHandler=()=>{
        
        const filtered=this.state.datas.filter(d=>d["Next Session Date"]===this.state.Next || d["Length"]===this.state.Length)
        console.log(filtered)
        this.setState({datas:filtered})
    }
    //get data based on Provider
    buttonHandler=()=>{
        const data = this.state.datas.map(function(a) { 
            a.Provider = a.Provider.toLowerCase();
            console.log(a)
            return a;
        });
        const filters=this.state.datas.filter(d=> d["Provider"]===this.state.Provider)
        console.log(filters)
        this.setState({datas:filters})
    }
    //get sorted data based on length
    onSortHandler=()=>{
        const order = this.state.datas.sort((a,b)=>a.Length-b.Length || a["Next Session Date"]-b["Next Session Date"])
        console.log(order)
        this.setState({datas:order})
    }
    render() {
     
        return (
        <div>
          <div className="header">
                   
            <div>
               <input type="text" placeholder="Search by provider" onChange={this.onProviderHandler}/>
               <button onClick={this.buttonHandler}>search</button>
             </div>
               <h1>or</h1>
             <div>
               <input type="text" placeholder=" search by next session date" onChange={this.onSessionHandler} />
               <input type="number" placeholder="length" onChange={this.onLengthHandler}/>
               <button onClick={this.onClickHandler}>search</button>
             </div>
            </div>
               <h1>Results found:{this.state.datas.length}</h1>
               <button onClick={this.onSortHandler}>sort</button>
            <div className="content" style={{height:"50%"}}>
               {this.state.datas.map(data=>(
                   <span key={data["Course Id"]}>
                       <div className="course">

                       <h1>Provider:{data.Provider}</h1>
                       <p>Length:{data.Length}</p>
                       <p>Course name: {data["Course Name"]}</p>
                       <p>Parent Subject: {data["Parent Subject"]}</p>
                       <p>Child Subject: {data["Child Subject"]}</p>
                       <p>Next Session date: {data["Next Session Date"]}</p>
                       <p> <a href={data["Url"]}>Url</a> </p>
                       <p>Universities/Institutions: {data["Universities/Institutions"]}</p>
                       
                       </div>
                   </span>
               ))}
             </div>
        </div>
        )
    }
}
