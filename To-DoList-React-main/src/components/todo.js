import React ,{useDeferredValue, useEffect, useState} from 'react'
import "./style.css"




const Todo = () => {

    const getLocalData=()=>{
        const list=localStorage.getItem("mytodolist");
        if(list){
            return JSON.parse(list);
        }
        else{
            return([]);
    
        }
    }
//edit the items
const editItem=(index)=>{
    const item_todo_edited=items.find((curElem)=>{
        return curElem.id===index;
    });
    setInputdata(item_todo_edited.name);
setIsEditItem(index);
setToggleButton(true);
}


    const [inputdata,setInputdata]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);

    const deleteitem=(index)=>{
        const updatelist=
            items.filter((curElem)=>{
            return( curElem.id !==index)
        });
        setItems(updatelist);
    };


    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items])

const additem=()=>{
    if(!inputdata)
    {
        alert("No item to insert");
    }
    else if(inputdata && toggleButton){
        setItems(items.map((curElem)=>{
            if(curElem.id===isEditItem){
                return{...curElem,name:inputdata}
            }
            else{
                return curElem;
            }
      }))
      setInputdata("");
      setIsEditItem();
      setToggleButton(false)
    }
    else{
        const MyNewInputData={
            id:new Date().getTime().toString(),
            name:inputdata
        }
        setItems([...items,MyNewInputData]);
        setInputdata("");
    }
   
};

  return (
   <>
   <div className='main-div'>
    <div className='child-div'>
        <figure>
            <img src="./images/todo.png" alt="no image" />
            <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className='addItems'>
            
            <input type="text" placeholder='✍Add Item' value={inputdata} onChange={(event)=>setInputdata(event.target.value)} className='form-control'/>
            {(toggleButton===true)?  <i className="fa fa-pencil-square-o" onClick={additem} ></i> 
            
            
           : <i className="fa fa-plus add-btn"  onClick={additem} ></i>}
        </div>
 {/* show our items here */}
<div className='showItems'>
    {
        items.map((curElem)=>{
            return(
              <div className='eachItem' key={curElem.id}>
        <h3>{curElem.name}</h3>
        <div className='todo-btn'>
         
        <i className="fa fa-pencil-square-o" onClick={()=>editItem(curElem.id)} ></i>
        <i className="fa fa-trash" onClick={()=>deleteitem(curElem.id)} ></i>
       
        </div>
    </div>
         )
        })
    } 
</div>
        <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={()=>setItems([])}><span>CHECK LIST</span></button>
        </div>
    </div>
   </div>
   </>
  )
}

export default Todo
