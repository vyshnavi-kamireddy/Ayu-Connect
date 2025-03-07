import React from 'react'
import Receipe from './Receipe';
import getRecipeFromMistral from './Ai';
import { RotatingLines } from 'react-loader-spinner'

function Inputtext() {

  const [ingredient,setIngredient]=React.useState([]);
  const [isShown,setisShown] = React.useState(false);
  const [response,setResponse]=React.useState("");
  const receipeSection=React.useRef(null);
  const [load,setLoad]=React.useState(false);

  React.useEffect(()=>{
    if(response!==""&&receipeSection.current!==null)
    {
      receipeSection.current.scrollIntoView({behavior:"smooth"});
    }
  },[response]);

  const data=ingredient.map((value)=>{
    return <li key={value}>{value}</li>
  });

  function addIngredient(formData)
  {
    const newIngredient=formData.get("ingredient");
    setIngredient((prevIngredient)=>{
      return [...prevIngredient,newIngredient];
    });
  }

  function loading()
  {
    setLoad(true);
  }

  async function triggershown()
  {
    loading();
    setisShown((prevShown)=>!prevShown?!prevShown:prevShown);
    const responsestr=await getRecipeFromMistral(ingredient);
    setResponse(responsestr);
    setLoad(false);
  }

  return (


    <div className='form-div'>

      <form action={addIngredient} className='input-text'>
        <input placeholder='e.g.Yippee Noodles' className='chef-input' name="ingredient" />
        <button className='chef-add-button'>Add</button>
      </form>


      {ingredient.length>0 && <section className='display-section'>
        <h1 className='ingredients-head'>Ingredients on hand:</h1>
        <ul className='un-list'>
          {data}
        </ul>

        {ingredient.length>3 && <div className='ready-div' ref={receipeSection}>
          <div className='ready-div-text'>
            <h2 className='ready-que'>Ready for a recipe?</h2>
            <p className='ready-para'>Generate a recipe from your list of ingredients.</p>
          </div>
          <button className='receipe-button' onClick={triggershown}>Get a recipe</button>
        </div>}

      </section>}

      {load  && <div className='load'><RotatingLines
          visible={true}
          height="60"
          width="60"
          color="#FF0000"
          strokeWidth="4"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
      /></div>}
      {isShown && <Receipe response={response} />}
    </div>
    
  );
}

export default Inputtext
